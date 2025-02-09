import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PencilSquareIcon, EyeIcon, CheckIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabase';

type Callout = {
    id: string;
    name: string;
    description: string;
    slug: string;
    image_src: string;
    image_alt: string;
};

export default function EditableCategory() {
    const [callouts, setCallouts] = useState<Callout[]>([]);
    const [editMode, setEditMode] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [editingCallout, setEditingCallout] = useState<string | null>(null);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    useEffect(() => {
        loadCallouts();
    }, []);

    const loadCallouts = async () => {
        try {
            const { data, error } = await supabase
                .from('callouts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCallouts(data || []);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleImageClick = (calloutId: string) => {
        if (!editMode) return;
        setEditingCallout(calloutId);
        fileInputRef.current?.click();
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !editingCallout) return;

        try {
            // Upload image to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            // Update callout with new image URL
            const updatedCallouts = callouts.map(callout => {
                if (callout.id === editingCallout) {
                    return { ...callout, image_src: publicUrl };
                }
                return callout;
            });
            setCallouts(updatedCallouts);
            setUnsavedChanges(true);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleTextEdit = (
        calloutId: string,
        field: keyof Callout,
        value: string
    ) => {
        if (!editMode) return;
        const updatedCallouts = callouts.map(callout => {
            if (callout.id === calloutId) {
                return { ...callout, [field]: value };
            }
            return callout;
        });
        setCallouts(updatedCallouts);
        setUnsavedChanges(true);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError(null);

            // Update each modified callout
            for (const callout of callouts) {
                const { error } = await supabase
                    .from('callouts')
                    .update({
                        name: callout.name,
                        description: callout.description,
                        image_src: callout.image_src,
                        image_alt: callout.image_alt
                    })
                    .eq('id', callout.id);

                if (error) throw error;
            }

            setUnsavedChanges(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hidden file input for image uploads */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />

            {/* Edit mode toggle and save button */}
            <div className="fixed top-4 right-4 flex items-center space-x-4 z-50">
                <button
                    onClick={() => setEditMode(!editMode)}
                    className={`p-2 rounded-full ${editMode ? 'bg-indigo-600' : 'bg-gray-600'
                        } text-white hover:opacity-90 transition-opacity`}
                    title={editMode ? 'Switch to view mode' : 'Switch to edit mode'}
                >
                    {editMode ? (
                        <EyeIcon className="h-5 w-5" />
                    ) : (
                        <PencilSquareIcon className="h-5 w-5" />
                    )}
                </button>
                {editMode && unsavedChanges && (
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                        <CheckIcon className="h-5 w-5 mr-2" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                )}
            </div>

            {error && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded z-50">
                    {error}
                </div>
            )}

            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
                                className={`group relative ${editMode ? 'cursor-pointer' : ''}`}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                            >
                                <div
                                    className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 dark:bg-gray-800"
                                    onClick={() => handleImageClick(callout.id)}
                                >
                                    <img
                                        src={callout.image_src || '/placeholder.jpg'}
                                        alt={callout.image_alt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                    {editMode && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <PencilSquareIcon className="h-8 w-8 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            value={callout.name}
                                            onChange={(e) => handleTextEdit(callout.id, 'name', e.target.value)}
                                            className="text-base font-semibold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-indigo-500 w-full"
                                        />
                                    ) : (
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                            {callout.name}
                                        </h3>
                                    )}
                                    {editMode ? (
                                        <textarea
                                            value={callout.description}
                                            onChange={(e) => handleTextEdit(callout.id, 'description', e.target.value)}
                                            className="mt-2 text-sm text-gray-500 dark:text-gray-400 bg-transparent border border-gray-300 dark:border-gray-700 rounded p-2 w-full focus:outline-none focus:border-indigo-500"
                                            rows={3}
                                        />
                                    ) : (
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            {callout.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
