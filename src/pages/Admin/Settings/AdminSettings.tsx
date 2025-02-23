import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, TrashIcon, MagnifyingGlassIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import bcrypt from 'bcryptjs';
import { useAuth } from '@/context/AuthContext';

type User = {
    id: string;
    username: string;
    created_at: string;
    role?: string;
    status?: 'active' | 'suspended';
    last_login?: string;
};

// Extracted and memoized AddUserForm component
const AddUserForm = React.memo(function AddUserForm({
    newUsername,
    setNewUsername,
    newUserPassword,
    setNewUserPassword,
    handleAddUser,
}: {
    newUsername: string;
    setNewUsername: React.Dispatch<React.SetStateAction<string>>;
    newUserPassword: string;
    setNewUserPassword: React.Dispatch<React.SetStateAction<string>>;
    handleAddUser: (e: React.FormEvent) => void;
}) {
    return (
        <form onSubmit={handleAddUser} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Benutzername"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900"
                    required
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 
                         transform hover:scale-[1.02] transition-all"
            >
                Admin Benutzer hinzufügen
            </button>
        </form>
    );
});

const PasswordUpdateForm = React.memo(function PasswordUpdateForm({
    currentPassword,
    setCurrentPassword,
    newPassword,
    confirmPassword,
    setConfirmPassword,
    passwordStrength,
    handlePasswordChange,
    handleChangePassword,
}: {
    currentPassword: string;
    setCurrentPassword: React.Dispatch<React.SetStateAction<string>>;
    newPassword: string;
    confirmPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    passwordStrength: number;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangePassword: () => void;
}) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aktuelles Passwort
                </label>
                <div className="relative">
                    <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showCurrentPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Neues Passwort
                </label>
                <div className="relative">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showNewPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
                <div className="mt-2 flex gap-1">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-2 w-full rounded ${i < passwordStrength ? 'bg-blue-500' : 'bg-gray-200'}`} />
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passwort bestätigen
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>
            <button
                onClick={handleChangePassword}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all disabled:opacity-50"
                disabled={!currentPassword || !newPassword || !confirmPassword}
            >
                Passwort aktualisieren
            </button>
        </div>
    );
});

export default function AdminSettings() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    useEffect(() => {
        const init = async () => {
            if (!isAuthenticated) {
                console.log('Not authenticated, redirecting to login');
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                await loadUsers();
            } catch (err) {
                console.error('Initialization error:', err);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [isAuthenticated, navigate]); // Add isAuthenticated to dependencies

    const loadUsers = async () => {
        try {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            if (!currentUser) return;

            const { data: adminUsers, error: adminError } = await supabase
                .from('admin_users')

                .select('*');
            if (adminError) throw adminError;

            const transformedUsers: User[] = adminUsers.map(user => ({
                id: user.auth_user_id,
                username: user.username,
                created_at: user.created_at,
                role: user.role || 'admin',
                status: 'active',
            }));

            setUsers(transformedUsers);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const calculatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
        calculatePasswordStrength(e.target.value);
    };

    useEffect(() => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('Passwörter stimmen nicht überein');
            return;
        }

        try {
            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const { error } = await supabase
                .from('admin_users')
                .update({ password_hash: hashedPassword })
                .eq('username', user.username);

            if (error) throw error;

            alert('Passwort erfolgreich geändert');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Check if username exists with maybeSingle() to avoid errors on no row
            const { data: existingUser, error: userError } = await supabase
                .from('admin_users')
                .select('username')
                .eq('username', newUsername)
                .maybeSingle();

            if (userError) {
                console.error(userError);
                // Optionally alert or handle error here
                return;
            }

            if (existingUser) {
                alert('Benutzername existiert bereits');
                return;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(newUserPassword, 10);

            // Insert new admin user
            const { error: adminError } = await supabase
                .from('admin_users')
                .insert([
                    {
                        username: newUsername,
                        password_hash: hashedPassword,
                        role: 'admin'
                    }
                ]);

            if (adminError) throw adminError;

            alert('Admin Benutzer erfolgreich erstellt');
            setNewUsername('');
            setNewUserPassword('');
            loadUsers();
        } catch (error: any) {
            console.error('Error creating user:', error);
            alert(error.message);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Benutzer wirklich löschen?')) return;

        try {
            const { error } = await supabase.auth.admin.deleteUser(userId);
            if (error) throw error;

            setUsers(users.filter(user => user.id !== userId));
            alert('Benutzer gelöscht');
        } catch (error: any) {
            alert(error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-200">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const UsersTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Benutzername
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                            Erstellt am
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aktionen
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                <div className="text-sm text-gray-500">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button
                                    onClick={() => {
                                        setUserToDelete(user);
                                        setShowConfirmation(true);
                                    }}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-400 py-8 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => navigate('/admin')}
                        className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Einstellungen</h1>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Passwort Aktualisieren Section */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Passwort ändern</h2>
                        <PasswordUpdateForm
                            currentPassword={currentPassword}
                            setCurrentPassword={setCurrentPassword}
                            newPassword={newPassword}
                            confirmPassword={confirmPassword}
                            setNewPassword={setNewPassword}
                            setConfirmPassword={setConfirmPassword}
                            passwordStrength={passwordStrength}
                            handlePasswordChange={handlePasswordChange}
                            handleChangePassword={handleChangePassword}
                        />
                    </motion.div>

                    {/* User Management Section */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Benutzer verwalten</h2>

                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Benutzer suchen..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                            />
                        </div>

                        {/* Add User Form */}
                        <AddUserForm
                            newUsername={newUsername}
                            setNewUsername={setNewUsername}
                            newUserPassword={newUserPassword}
                            setNewUserPassword={setNewUserPassword}
                            handleAddUser={handleAddUser}
                        />

                        {/* Users List */}
                        <UsersTable />
                    </motion.div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Benutzer löschen
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Sind Sie sicher, dass Sie den Benutzer "{userToDelete?.username}" löschen möchten?
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                    Abbrechen
                                </button>
                                <button
                                    onClick={() => {
                                        if (userToDelete) {
                                            handleDeleteUser(userToDelete.id);
                                            setShowConfirmation(false);
                                        }
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                                >
                                    Löschen
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
