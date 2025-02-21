import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusIcon, PencilSquareIcon, XMarkIcon, DocumentTextIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

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
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedCallout, setEditedCallout] = useState<Callout | null>(null);
    const [editingField, setEditingField] = useState<{ id: string, field: 'name' | 'description' | 'image_src' } | null>(null);
    const [editedText, setEditedText] = useState('');
    const [editableFields, setEditableFields] = useState<{ id: string, field: 'name' | 'description' } | null>(null);
    const [editValue, setEditValue] = useState('');
    const [uploading, setUploading] = useState(false);

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
        setIsDeleting(true);
        try {
            // Lösche zuerst den HTML-Content
            await supabase
                .from('calloutshtml')
                .delete()
                .eq('slug', callout.slug);

            // Dann lösche den Callout selbst
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

    const handleEdit = (callout: Callout) => {
        setEditingId(callout.id);
        setEditedCallout({ ...callout });
    };

    const handleSave = async () => {
        if (!editedCallout) return;

        try {
            const { error } = await supabase
                .from('callouts')
                .update({
                    name: editedCallout.name,
                    description: editedCallout.description,
                    slug: editedCallout.slug,
                    image_src: editedCallout.image_src,
                    image_alt: editedCallout.image_alt
                })
                .eq('id', editedCallout.id);

            if (error) throw error;

            setCallouts(callouts.map(c =>
                c.id === editedCallout.id ? editedCallout : c
            ));
            setEditingId(null);
            setEditedCallout(null);
        } catch (error: any) {
            console.error('Error saving callout:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedCallout(null);
    };

    const handleInlineEdit = (callout: Callout, field: 'name' | 'description' | 'image_src') => {
        setEditingField({ id: callout.id, field });
        setEditedText(callout[field]);
    };

    const handleInlineSave = async (callout: Callout) => {
        if (!editingField) return;

        try {
            const updates = {
                [editingField.field]: editedText
            };

            const { error } = await supabase
                .from('callouts')
                .update(updates)
                .eq('id', callout.id);

            if (error) throw error;

            setCallouts(callouts.map(c =>
                c.id === callout.id ? { ...c, ...updates } : c
            ));
            setEditingField(null);
        } catch (error: any) {
            console.error('Error saving:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleNameChange = async (callout: Callout, newName: string) => {
        try {
            const { error } = await supabase
                .from('callouts')
                .update({ name: newName })
                .eq('id', callout.id);

            if (error) throw error;

            setCallouts(callouts.map(c =>
                c.id === callout.id ? { ...c, name: newName } : c
            ));
        } catch (error: any) {
            console.error('Error saving:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleDescriptionChange = async (callout: Callout, newDescription: string) => {
        try {
            const { error } = await supabase
                .from('callouts')
                .update({ description: newDescription })
                .eq('id', callout.id);

            if (error) throw error;

            setCallouts(callouts.map(c =>
                c.id === callout.id ? { ...c, description: newDescription } : c
            ));
        } catch (error: any) {
            console.error('Error saving:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleFieldEdit = (callout: Callout, field: 'name' | 'description') => {
        setEditableFields({ id: callout.id, field });
        setEditValue(callout[field]);
    };

    const handleFieldSave = async (callout: Callout) => {
        if (!editableFields) return;

        try {
            const { error } = await supabase
                .from('callouts')
                .update({ [editableFields.field]: editValue })
                .eq('id', callout.id);

            if (error) throw error;

            setCallouts(callouts.map(c =>
                c.id === callout.id ? { ...c, [editableFields.field]: editValue } : c
            ));
            setEditableFields(null);
        } catch (error: any) {
            console.error('Error saving:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleImageUpload = async (callout: Callout, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);

            // Compress and resize image
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1200,
                useWebWorker: true,
                fileType: 'image/jpeg'
            };

            const compressedFile = await imageCompression(file, options);

            // Upload file to Supabase storage
            const fileName = `${Date.now()}.jpg`;
            const filePath = `callout-images/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('card-images')
                .upload(filePath, compressedFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('card-images')
                .getPublicUrl(filePath);

            // Update callout with new image URL
            const { error: updateError } = await supabase
                .from('callouts')
                .update({ image_src: publicUrl })
                .eq('id', callout.id);

            if (updateError) throw updateError;

            // Update local state
            setCallouts(callouts.map(c =>
                c.id === callout.id ? { ...c, image_src: publicUrl } : c
            ));

        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // New function to add an empty callout record
    const handleAddCallout = async () => {
        try {
            const newSlug = `callout-${Date.now()}`;
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) throw new Error('Not authenticated');

            const { data, error } = await supabase
                .from('callouts')
                .insert({
                    name: '',
                    description: '',
                    slug: newSlug,
                    image_src: '',
                    image_alt: '',
                    category: 'tipps', // Standard-Kategorie hinzugefügt
                    page_content: null
                })
                .single();

            if (error) throw error;
            navigate(`/${newSlug}/edit`);
        } catch (error: any) {
            console.error('Error adding callout:', error);
            alert('❌ Fehler beim Hinzufügen des Callouts');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Lädt...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="text-center">
                    <div className="text-red-600 dark:text-red-400 text-xl mb-4">Fehler: {error}</div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Erneut versuchen
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 mt-10">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Seiten
                            </h2>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => navigate('/about/edit')}
                                    className="flex items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
                                >
                                    <DocumentTextIcon className="h-5 w-5 mr-1" />
                                    Über-Seite bearbeiten
                                </button>
                                <button
                                    onClick={handleAddCallout}
                                    className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    <PlusIcon className="h-5 w-5 mr-1" />
                                    Callout hinzufügen
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
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
                                    {editingId === callout.id ? (
                                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                                            <div className="space-y-4">
                                                <input
                                                    type="text"
                                                    value={editedCallout?.name || ''}
                                                    onChange={e => setEditedCallout(prev => prev ? { ...prev, name: e.target.value } : null)}
                                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                                    placeholder="Name"
                                                />
                                                <input
                                                    type="text"
                                                    value={editedCallout?.description || ''}
                                                    onChange={e => setEditedCallout(prev => prev ? { ...prev, description: e.target.value } : null)}
                                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                                    placeholder="Beschreibung"
                                                />
                                                <input
                                                    type="text"
                                                    value={editedCallout?.image_src || ''}
                                                    onChange={e => setEditedCallout(prev => prev ? { ...prev, image_src: e.target.value } : null)}
                                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                                    placeholder="Bild-URL"
                                                />
                                                <input
                                                    type="text"
                                                    value={editedCallout?.image_alt || ''}
                                                    onChange={e => setEditedCallout(prev => prev ? { ...prev, image_alt: e.target.value } : null)}
                                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                                    placeholder="Alt-Text"
                                                />
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={handleSave}
                                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                                    >
                                                        <CheckIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                    >
                                                        <XMarkIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 dark:bg-gray-800">
                                                <img
                                                    src={callout.image_src || '/placeholder.jpg'}
                                                    alt={callout.image_alt}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <label className="cursor-pointer bg-black bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all">
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => handleImageUpload(callout, e)}
                                                            disabled={uploading}
                                                        />
                                                        <div className="flex items-center space-x-2 text-white">
                                                            {uploading ? (
                                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                            ) : (
                                                                <PencilSquareIcon className="h-5 w-5" />
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <div className="flex items-center justify-between">
                                                    {editableFields?.id === callout.id && editableFields.field === 'name' ? (
                                                        <div className="flex items-center space-x-2 w-full">
                                                            <input
                                                                type="text"
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                className="text-sm text-gray-500 dark:text-gray-400 w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none p-1"
                                                                autoFocus
                                                            />
                                                            <button onClick={() => handleFieldSave(callout)} className="text-green-600">
                                                                <CheckIcon className="h-4 w-4" />
                                                            </button>
                                                            <button onClick={() => setEditableFields(null)} className="text-red-600">
                                                                <XMarkIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-between w-full">
                                                            <h3 className="text-sm text-gray-500 dark:text-gray-400">
                                                                {callout.name}
                                                            </h3>
                                                            <button
                                                                onClick={() => handleFieldEdit(callout, 'name')}
                                                                className="ml-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                                                aria-label="Name bearbeiten"
                                                            >
                                                                <PencilSquareIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between mt-1">
                                                    {editableFields?.id === callout.id && editableFields.field === 'description' ? (
                                                        <div className="flex items-center space-x-2 w-full">
                                                            <input
                                                                type="text"
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                className="text-base font-semibold text-gray-900 dark:text-white w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none p-1"
                                                                autoFocus
                                                            />
                                                            <button onClick={() => handleFieldSave(callout)} className="text-green-600">
                                                                <CheckIcon className="h-4 w-4" />
                                                            </button>
                                                            <button onClick={() => setEditableFields(null)} className="text-red-600">
                                                                <XMarkIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-between w-full">
                                                            <p className="text-base font-semibold text-gray-900 dark:text-white">
                                                                {callout.description}
                                                            </p>
                                                            <button
                                                                onClick={() => handleFieldEdit(callout, 'description')}
                                                                className="ml-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                                                aria-label="Beschreibung bearbeiten"
                                                            >
                                                                <PencilSquareIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex justify-between mt-4 space-x-2">
                                                    {/* Bestehender Edit Button */}
                                                    <button
                                                        onClick={() => navigate(`/${callout.slug}/edit`)}
                                                        className="inline-flex items-center px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                                    >
                                                        <PencilSquareIcon className="h-4 w-4 mr-1" />
                                                        <span className="hidden sm:inline text-sm">Seite bearbeiten</span>
                                                    </button>

                                                    {/* Neuer Delete Button */}
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm('Bist du sicher, dass du diesen Artikel löschen möchtest? Dies kann nicht rückgängig gemacht werden.')) {
                                                                handleDelete(callout);
                                                            }
                                                        }}
                                                        className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors group"
                                                    >
                                                        <TrashIcon className="h-4 w-4 group-hover:animate-bounce" />
                                                        <span className="hidden sm:inline ml-1 text-sm">Löschen</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
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
