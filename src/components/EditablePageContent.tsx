import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PencilSquareIcon, EyeIcon, CheckIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';

type PageContent = {
    id: string;
    slug: string;
    title: string;
    content: string;
    meta_description: string;
    meta_keywords: string;
    header_image: string;
    sections: Section[];
};

type Section = {
    id: string;
    title: string;
    content: string;
    image_url?: string;
    order: number;
};

export default function EditablePageContent() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState<PageContent | null>(null);
    const [editMode, setEditMode] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [editingImageField, setEditingImageField] = useState<{ type: 'header' | 'section', sectionId?: string } | null>(null);

    useEffect(() => {
        loadContent();
    }, [slug]);

    const loadContent = async () => {
        if (!slug) return;

        try {
            const { data, error } = await supabase
                .from('page_contents')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) throw error;

            // Load sections
            const { data: sections, error: sectionsError } = await supabase
                .from('page_sections')
                .select('*')
                .eq('page_id', data.id)
                .order('order', { ascending: true });

            if (sectionsError) throw sectionsError;

            setContent({ ...data, sections: sections || [] });
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleImageClick = (type: 'header' | 'section', sectionId?: string) => {
        if (!editMode) return;
        setEditingImageField({ type, sectionId });
        fileInputRef.current?.click();
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !editingImageField || !content) return;

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { error: uploadError, data } = await supabase.storage
                .from('images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            if (editingImageField.type === 'header') {
                setContent({ ...content, header_image: publicUrl });
            } else if (editingImageField.type === 'section' && editingImageField.sectionId) {
                const updatedSections = content.sections.map(section => {
                    if (section.id === editingImageField.sectionId) {
                        return { ...section, image_url: publicUrl };
                    }
                    return section;
                });
                setContent({ ...content, sections: updatedSections });
            }
            setUnsavedChanges(true);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleTextEdit = (field: keyof PageContent | { type: 'section', field: keyof Section, sectionId: string }, value: string) => {
        if (!editMode || !content) return;

        if (typeof field === 'string') {
            setContent({ ...content, [field]: value });
        } else if (field.type === 'section') {
            const updatedSections = content.sections.map(section => {
                if (section.id === field.sectionId) {
                    return { ...section, [field.field]: value };
                }
                return section;
            });
            setContent({ ...content, sections: updatedSections });
        }
        setUnsavedChanges(true);
    };

    const handleSave = async () => {
        if (!content) return;

        try {
            setSaving(true);
            setError(null);

            // Update main content
            const { error: contentError } = await supabase
                .from('page_contents')
                .update({
                    title: content.title,
                    content: content.content,
                    meta_description: content.meta_description,
                    meta_keywords: content.meta_keywords,
                    header_image: content.header_image
                })
                .eq('id', content.id);

            if (contentError) throw contentError;

            // Update sections
            for (const section of content.sections) {
                const { error: sectionError } = await supabase
                    .from('page_sections')
                    .update({
                        title: section.title,
                        content: section.content,
                        image_url: section.image_url
                    })
                    .eq('id', section.id);

                if (sectionError) throw sectionError;
            }

            setUnsavedChanges(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (!content) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
        );
    }

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
                    className={`p-2 rounded-full ${
                        editMode ? 'bg-indigo-600' : 'bg-gray-600'
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

            {/* Header Section */}
            <div 
                className="relative h-96 w-full overflow-hidden cursor-pointer"
                onClick={() => handleImageClick('header')}
            >
                <img
                    src={content.header_image || '/placeholder.jpg'}
                    alt="Header"
                    className="w-full h-full object-cover"
                />
                {editMode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                        <PencilSquareIcon className="h-12 w-12 text-white" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    {editMode ? (
                        <input
                            type="text"
                            value={content.title}
                            onChange={(e) => handleTextEdit('title', e.target.value)}
                            className="text-4xl font-bold text-white bg-transparent border-b border-white focus:outline-none focus:border-indigo-500 w-full"
                        />
                    ) : (
                        <h1 className="text-4xl font-bold text-white">{content.title}</h1>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {editMode ? (
                    <textarea
                        value={content.content}
                        onChange={(e) => handleTextEdit('content', e.target.value)}
                        className="w-full min-h-[200px] p-4 text-lg text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-indigo-500"
                        placeholder="Main content..."
                    />
                ) : (
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {content.content}
                    </div>
                )}

                {/* Sections */}
                <div className="mt-16 space-y-16">
                    {content.sections.map((section) => (
                        <motion.div
                            key={section.id}
                            className="relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {editMode ? (
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => handleTextEdit({ type: 'section', field: 'title', sectionId: section.id }, e.target.value)}
                                    className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-indigo-500 w-full mb-4"
                                />
                            ) : (
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {section.title}
                                </h2>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    {editMode ? (
                                        <textarea
                                            value={section.content}
                                            onChange={(e) => handleTextEdit({ type: 'section', field: 'content', sectionId: section.id }, e.target.value)}
                                            className="w-full min-h-[150px] p-4 text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-indigo-500"
                                        />
                                    ) : (
                                        <div className="prose dark:prose-invert">
                                            {section.content}
                                        </div>
                                    )}
                                </div>
                                {section.image_url && (
                                    <div 
                                        className="relative cursor-pointer"
                                        onClick={() => handleImageClick('section', section.id)}
                                    >
                                        <img
                                            src={section.image_url}
                                            alt={section.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        {editMode && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                                <PencilSquareIcon className="h-8 w-8 text-white" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
