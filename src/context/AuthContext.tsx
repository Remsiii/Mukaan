import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: async () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Prüfe lokalen Storage beim Start
        return localStorage.getItem('isAdminAuthenticated') === 'true';
    });
    const [user, setUser] = useState<any>(() => {
        // Versuche User aus localStorage zu laden
        const savedUser = localStorage.getItem('adminUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (username: string, password: string) => {
        try {
            const { data: adminUser, error: adminError } = await supabase
                .from('admin_users')
                .select('*')
                .eq('username', username)
                .single();

            if (adminError) {
                console.error('Database error:', adminError);
                throw new Error('Login fehlgeschlagen');
            }

            if (!adminUser) {
                throw new Error('Benutzer nicht gefunden');
            }

            const isValidPassword = await bcrypt.compare(password, adminUser.password_hash);
            if (!isValidPassword) {
                throw new Error('Falsches Passwort');
            }

            // Speichere Auth-Status und User in localStorage
            localStorage.setItem('isAdminAuthenticated', 'true');
            localStorage.setItem('adminUser', JSON.stringify(adminUser));

            setIsAuthenticated(true);
            setUser(adminUser);
        } catch (error) {
            console.error('Auth error:', error);
            localStorage.removeItem('isAdminAuthenticated');
            localStorage.removeItem('adminUser');
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        localStorage.removeItem('adminUser');
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
