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
            const { data: adminUser, error: adminError } = await supabase
                .from('admin_users')
                .select('*')
                .eq('username', username)
                .maybeSingle(); // changed from .single() to .maybeSingle()

            if (adminError) {
                console.error('Database error:', adminError);
                throw new Error('Login fehlgeschlagen. Bitte versuchen Sie es später erneut.');
            }

            if (!adminUser) {
                throw new Error('Ungültiger Benutzername oder Passwort');
            }

            const isValidPassword = await bcrypt.compare(password, adminUser.password_hash);

            if (!isValidPassword) {
                throw new Error('Ungültiger Benutzername oder Passwort');
            }

            setIsAuthenticated(true);
            setUser(adminUser);
        } catch (error) {
            console.error('Auth error:', error);
            throw error;
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
