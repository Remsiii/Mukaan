import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusIcon, PencilSquareIcon, XMarkIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type ContentBlock = {
    type: 'paragraph' | 'heading' | 'list' | 'image';
    text: string;
    items?: string[];
};

type PageContent = {
    title: string;
    subtitle: string;
    imagePath: string;
    imageAlt: string;
    content: ContentBlock[];
    button?: {
        text: string;
        link: string;
    };
};

type Callout = {
    id: string;
    name: string;
    description: string;
    slug: string;
    image_src: string;
    image_alt: string;
    page_content: PageContent | null;
    created_at?: string;
    updated_at?: string;
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [callouts, setCallouts] = useState<Callout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Check auth on mount
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                console.error('Auth error:', error);
                navigate('/login');
                return;
            }

            // Get user role if needed
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profileError || !profile || profile.role !== 'admin') {
                console.error('Not authorized');
                navigate('/');
                return;
            }
        };

        checkAuth();
    }, [navigate]);

    // Load callouts when component mounts
    useEffect(() => {
        const loadCallouts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const { data: { user }, error: authError } = await supabase.auth.getUser();
                if (authError || !user) {
                    throw new Error('Not authenticated');
                }

                const { data, error: fetchError } = await supabase
                    .from('callouts')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (fetchError) {
                    throw new Error(fetchError.message);
                }

                setCallouts(data || []);
            } catch (error: any) {
                console.error('Error in loadCallouts:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadCallouts();
    }, []);

    const handleDelete = async (callout: Callout) => {
        if (!confirm('Are you sure you want to delete this callout?')) return;

        setIsDeleting(true);
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                throw new Error('Not authenticated');
            }

            const { error } = await supabase
                .from('callouts')
                .delete()
                .eq('id', callout.id);

            if (error) throw error;

            setCallouts(callouts.filter(c => c.id !== callout.id));
        } catch (error: any) {
            console.error('Error deleting callout:', error);
            alert('Error: ' + error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="text-center">
                    <div className="text-red-600 dark:text-red-400 text-xl mb-4">Error: {error}</div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Pages
                            </h2>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => navigate('/about/edit')}
                                    className="flex items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
                                >
                                    <DocumentTextIcon className="h-5 w-5 mr-1" />
                                    Edit About Page
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Manage Callouts
                            </h2>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => navigate('/admin/edit-category')}
                                    className="flex items-center justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500"
                                >
                                    <PencilSquareIcon className="h-5 w-5 mr-1" />
                                    Edit Category View
                                </button>
                                <button
                                    onClick={() => navigate('/admin/edit/new')}
                                    className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    <PlusIcon className="h-5 w-5 mr-1" />
                                    Add Callout
                                </button>
                            </div>
                        </div>

                        <motion.div
                            className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {callouts.map((callout) => (
                                <motion.div
                                    key={callout.id}
                                    className="group relative"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0 }
                                    }}
                                >
                                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 dark:bg-gray-800">
                                        <img
                                            src={callout.image_src || '/placeholder.jpg'}
                                            alt={callout.image_alt}
                                            className="h-full w-full object-cover object-center"
                                        />
                                        {/* Delete button */}
                                        <div className="absolute top-2 right-2" style={{ zIndex: 20 }}>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleDelete(callout);
                                                }}
                                                disabled={isDeleting}
                                                className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer transition-opacity opacity-0 group-hover:opacity-100"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                        {/* Edit buttons in the middle */}
                                        <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ zIndex: 20 }}>
                                            {/* Edit Category Style */}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    navigate(`/admin/edit/${callout.id}`);
                                                }}
                                                className="p-3 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer flex items-center space-x-2 transition-transform transform hover:scale-105"
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                                <span>Edit Card</span>
                                            </button>
                                            {/* Edit Full Page */}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    navigate(`/${callout.slug}/edit`);
                                                }}
                                                className="p-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer flex items-center space-x-2 transition-transform transform hover:scale-105"
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                                <span>Edit Page</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="text-sm text-gray-500 dark:text-gray-400">
                                            {callout.name}
                                        </h3>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                                            {callout.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
