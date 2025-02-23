import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusIcon, PencilSquareIcon, XMarkIcon, CheckIcon, TrashIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { Particles } from '@/registry/magicui/particles';
import { LoadingSkeleton } from '@/components/LoadingSkeleton'
import { useAuth } from '../../context/AuthContext';

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


const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%234B5563'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%239CA3AF' text-anchor='middle'%3EKein Bild verfügbar%3C/text%3E%3C/svg%3E";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();  // Removed unused 'user'
    const [callouts, setCallouts] = useState<Callout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedCallout, setEditedCallout] = useState<Callout | null>(null);
    const [editableFields, setEditableFields] = useState<{ id: string, field: 'name' | 'description' } | null>(null);
    const [editValue, setEditValue] = useState('');
    const [uploading, setUploading] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false)
    const [activeCallout, setActiveCallout] = useState<Callout | null>(null)
    const [imageUrl, setImageUrl] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Simplified auth check
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
    }, [isAuthenticated, navigate]);

    // Declare loadCallouts in outer scope so it can be reused
    const loadCallouts = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (!isAuthenticated) {
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

    // Load callouts when component mounts
    useEffect(() => {
        loadCallouts();
    }, []);


    const handleDelete = async (callout: Callout) => {
        try {

            // First try to delete the HTML content
            const { error: htmlError } = await supabase
                .from('calloutshtml')
                .delete()
                .eq('slug', callout.slug)
                .select();


            if (htmlError) {
                console.error('HTML delete error:', htmlError);
                throw htmlError;
            }

            // Then delete the callout
            const { error } = await supabase
                .from('callouts')
                .delete()
                .eq('id', callout.id)
                .select();


            if (error) {
                console.error('Callout delete error:', error);
                throw error;
            }

            // Remove the deleted callout from state
            setCallouts(prevCallouts =>
                prevCallouts.filter(c => c.id !== callout.id)
            );

            alert('Callout erfolgreich gelöscht');
        } catch (error: any) {
            console.error('Error in handleDelete:', error);
            alert('Fehler beim Löschen: ' + error.message);
        }
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
                .eq('id', callout.id)
                .select();

            if (error) {
                console.error('Database error:', error);
                throw error;
            }


            // Refresh the callouts list
            await loadCallouts();

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

            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1200,
                useWebWorker: true,
                fileType: 'image/jpeg'
            };

            const compressedFile = await imageCompression(file, options);
            const fileName = `${Date.now()}.jpg`;
            const filePath = `callout-images/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('card-images')
                .upload(filePath, compressedFile);


            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('card-images')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('callouts')
                .update({ image_src: publicUrl })
                .eq('id', callout.id)
                .select();


            if (updateError) throw updateError;

            // Refresh the callouts list
            await loadCallouts();

        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
            setShowImageModal(false);
        }
    };

    const handleImageUrl = async () => {
        if (!activeCallout || !imageUrl.trim()) return;

        try {
            await updateCalloutImage(activeCallout.id, imageUrl);
            setCallouts(callouts.map(c =>
                c.id === activeCallout.id ? { ...c, image_src: imageUrl } : c
            ));
            setImageUrl('');
            setShowImageModal(false);
        } catch (error: any) {
            console.error('Error updating image URL:', error);
            alert('Error updating image URL: ' + error.message);
        }
    };

    const updateCalloutImage = async (calloutId: string, imageUrl: string) => {
        const { error } = await supabase
            .from('callouts')
            .update({ image_src: imageUrl })
            .eq('id', calloutId);

        if (error) throw error;
    };

    // Replace the existing handleAddCallout with this simpler version
    const handleAddCallout = () => {
        try {
            if (!isAuthenticated) {
                alert('❌ Nicht authentifiziert');
                navigate('/login');
                return;
            }

            const tempSlug = `callout-${Date.now()}`; // Temporary slug
            navigate(`/${tempSlug}/edit?isNew=true`);
        } catch (error: any) {
            console.error('Error:', error);
            alert('❌ Fehler beim Erstellen des neuen Artikels');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (isLoading) {
        return <LoadingSkeleton />;
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
        <div className="mt-10 relative backdrop-blur-xl bg-gradient-to-b to-grey/10 rounded-2xl p-4 pb-16 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100/20">
            <Particles
                className="absolute inset-0 z-0"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            />
            <div className="mx-auto">
                <div className="px-4 py-8">
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                            Seiten
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={handleAddCallout}
                                className="flex items-center justify-center rounded-md bg-indigo-600 px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                            >
                                <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                                <span className="hidden sm:inline">Beitrag erstellen</span>
                                <span className="sm:hidden">Neu</span>
                            </button>

                            <button
                                onClick={() => navigate('/admin/settings')}
                                className="flex items-center justify-center rounded-md bg-gray-600 px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
                            >
                                <Cog6ToothIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                                <span className="hidden sm:inline">Einstellungen</span>
                                <span className="sm:hidden">Einstellungen</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center rounded-md bg-red-600 px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-red-700"
                            >
                                <ArrowRightOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                                <span className="hidden sm:inline">Abmelden</span>
                                <span className="sm:hidden">Abmelden</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {callouts.map((callout) => (
                            <motion.div
                                key={callout.id}
                                className="group relative bg-gray-800/50 rounded-lg p-4"
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
                                        <div className="relative h-48 sm:h-64 lg:h-80 w-full overflow-hidden rounded-lg bg-white">
                                            <img
                                                src={callout.image_src || PLACEHOLDER_IMAGE}
                                                alt={callout.image_alt || 'Platzhalterbild'}
                                                className="h-full w-full object-cover object-center"
                                            />
                                            <button
                                                onClick={() => {
                                                    setActiveCallout(callout);
                                                    setShowImageModal(true);
                                                }}
                                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <PencilSquareIcon className="h-5 w-5 text-white" />
                                            </button>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            {/* Name field */}
                                            <div className="flex items-center justify-between">
                                                {editableFields?.id === callout.id && editableFields.field === 'name' ? (
                                                    <div className="flex items-center space-x-2 w-full">
                                                        <input
                                                            type="text"
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            className="text-sm text-white w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none p-1"
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
                                                        <h3 className="text-sm text-white">{callout.name}</h3>
                                                        <button
                                                            onClick={() => handleFieldEdit(callout, 'name')}
                                                            className="ml-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                                        >
                                                            <PencilSquareIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Description field */}
                                            <div className="flex items-center justify-between mt-1">
                                                {editableFields?.id === callout.id && editableFields.field === 'description' ? (
                                                    <div className="flex items-center space-x-2 w-full">
                                                        <input
                                                            type="text"
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            className="text-base font-semibold text-white w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none p-1"
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
                                                        <p className="text-base font-semibold text-white">
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
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <button
                                                    onClick={() => navigate(`/${callout.slug}/edit`)}
                                                    className="flex items-center justify-center px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                                >
                                                    <PencilSquareIcon className="h-4 w-4 mr-1" />
                                                    <span>Bearbeiten</span>
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Bist du sicher?')) {
                                                            handleDelete(callout);
                                                        }
                                                    }}
                                                    className="flex items-center justify-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                                >
                                                    <TrashIcon className="h-4 w-4 mr-1" />
                                                    <span>Löschen</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-96 max-w-[90vw]">
                        <h3 className="text-white text-lg mb-4">Bild ändern</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-white mb-2">Bild hochladen</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) => activeCallout && handleImageUpload(activeCallout, e)}
                                    accept="image/*"
                                    disabled={uploading}
                                    className="w-full text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">oder Bild-URL einfügen</label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://beispiel.de/bild.jpg"
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setShowImageModal(false);
                                        setActiveCallout(null);
                                        setImageUrl('');
                                    }}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                >
                                    Abbrechen
                                </button>
                                <button
                                    onClick={handleImageUrl}
                                    disabled={!imageUrl.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    URL einfügen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;