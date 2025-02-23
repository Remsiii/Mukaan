import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

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
        // Check for existing session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session);
            setUser(session?.user ?? null);
        });

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            // Fetch the admin user from your secure table
            const { data: adminUser, error: adminError } = await supabase
                .from('admin_users')
                .select('*')
                .eq('username', username)
                .single();

            if (adminError || !adminUser) {
                throw new Error('Ungültiger Benutzername oder Passwort');
            }

            const isValidPassword = await bcrypt.compare(password, adminUser.password_hash);
            if (!isValidPassword) {
                throw new Error('Ungültiger Benutzername oder Passwort');
            }

            // Manually set auth state without using Supabase signIn
            setIsAuthenticated(true);
            setUser(adminUser);
        } catch (error) {
            console.error('Auth error:', error);
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        }
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Logout error:', error);
        }
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
