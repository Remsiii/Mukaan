"use client";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
            <div className="bg-white dark:bg-black rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    You have successfully logged in to the admin area.
                </p>
            </div>
        </div>
    );
}
