import { supabase } from './supabase';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export type Profile = {
    id: string;
    email: string;
    role: 'admin' | 'user';
    created_at: string;
    updated_at: string;
};

export const auth = {
    // Get the current user's profile
    getProfile: async (): Promise<Profile | null> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return null;

            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            return profile;
        } catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    },

    // Check if the current user is an admin
    isAdmin: async (): Promise<boolean> => {
        const profile = await auth.getProfile();
        return profile?.role === 'admin';
    },

    // Sign out
    signOut: async () => {
        await supabase.auth.signOut();
    },

    async signIn(email: string, password: string) {
        // Temporarily store auth state in localStorage
        if (email === ADMIN_EMAIL && password === 'admin') {
            localStorage.setItem('user', JSON.stringify({ email }));
            return { user: { email }, error: null };
        }
        return { user: null, error: 'Invalid credentials' };
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

// Create a hook to subscribe to auth state changes
export const subscribeToAuthChanges = (callback: (profile: Profile | null) => void) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
            const profile = await auth.getProfile();

            // If this is a new sign in, create a profile
            if (!profile && session?.user) {
                const newProfile = {
                    id: session.user.id,
                    email: session.user.email,
                    role: session.user.email === ADMIN_EMAIL ? 'admin' : 'user',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                await supabase.from('profiles').insert([newProfile]);
                callback(newProfile as Profile);
            } else {
                callback(profile);
            }
        } else if (event === 'SIGNED_OUT') {
            callback(null);
        }
    });

    return () => subscription.unsubscribe();
};
