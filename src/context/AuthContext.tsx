import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: async () => { },
    logout: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check initial auth state
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsAuthenticated(!!user);
            setUser(user);
        };

        checkAuth();

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setIsAuthenticated(!!session);
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            // Use the full email for authentication
            const { error } = await supabase.auth.signInWithPassword({
                email: 'mukaanAdmin@mukaan.de', // hardcoded email
                password: password
            });

            if (error) {
                console.error('Auth error:', error);
                throw new Error('Ungültiger Benutzername oder Passwort');
            }
        } catch (error) {
            console.error('Auth error:', error);
            throw new Error('Ungültiger Benutzername oder Passwort');
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
