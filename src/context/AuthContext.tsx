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
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAdminAuthenticated') === 'true';
    });
    const [user, setUser] = useState<any>(() => {
        const saved = localStorage.getItem('adminUser');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (username: string, password: string) => {
        try {
            const { data: adminUser, error: adminError } = await supabase
                .from('admin_users')
                .select('id, username, role, password_hash')  // Added password_hash to selection
                .eq('username', username)
                .single();

            if (adminError || !adminUser) {
                throw new Error('Ungültiger Benutzername oder Passwort');
            }

            const isValidPassword = await bcrypt.compare(password, adminUser.password_hash);
            if (!isValidPassword) {
                throw new Error('Ungültiger Benutzername oder Passwort');
            }

            // Remove password_hash before storing in localStorage
            const { password_hash, ...userWithoutPassword } = adminUser;

            // Store auth state in localStorage
            localStorage.setItem('isAdminAuthenticated', 'true');
            localStorage.setItem('adminUser', JSON.stringify(userWithoutPassword));

            setIsAuthenticated(true);
            setUser(userWithoutPassword);
        } catch (error) {
            console.error('Auth error:', error);
            localStorage.removeItem('isAdminAuthenticated');
            localStorage.removeItem('adminUser');
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        }
    };

    useEffect(() => {
        const checkAuthState = () => {
            const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
            const savedUser = localStorage.getItem('adminUser');

            setIsAuthenticated(isAuth);
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        };

        checkAuthState();

        // Optional: Add event listener for storage changes
        window.addEventListener('storage', checkAuthState);
        return () => window.removeEventListener('storage', checkAuthState);
    }, []);

    const logout = async () => {
        try {
            // Clear Supabase session
            await supabase.auth.signOut();

            // Clear localStorage
            localStorage.removeItem('isAdminAuthenticated');
            localStorage.removeItem('adminUser');

            // Update state
            setIsAuthenticated(false);
            setUser(null);

            // Force reload to clear any cached state
            window.location.href = '/Mukaan/login';
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear everything even if there's an error
            localStorage.removeItem('isAdminAuthenticated');
            localStorage.removeItem('adminUser');
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
