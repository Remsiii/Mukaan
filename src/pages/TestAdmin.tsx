import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PlusIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

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
    const [callouts, setCallouts] = useState<Callout[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCallout, setEditingCallout] = useState<Callout | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        slug: '',
        imageSrc: '',
        imageAlt: '',
        pageTitle: '',
        pageSubtitle: '',
        pageImagePath: '',
        pageImageAlt: '',
        buttonText: '',
        buttonLink: '',
        content: [{ type: 'paragraph' as const, text: '' }],
    });

    // Load callouts when component mounts
    useEffect(() => {
        const loadCallouts = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    console.log('User not authenticated');
                    return;
                }

                console.log('Fetching initial callouts...');
                const { data, error } = await supabase
                    .from('callouts')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error loading callouts:', error);
                    return;
                }

                console.log('Loaded callouts:', data);
                setCallouts(data || []);
            } catch (error) {
                console.error('Error in loadCallouts:', error);
            }
        };

        loadCallouts();
    }, []);

    const handleEdit = (callout: Callout) => {
        console.log('Editing callout:', callout);
        setEditingCallout(callout);
        setFormData({
            name: callout.name,
            description: callout.description,
            slug: callout.slug,
            imageSrc: callout.image_src || '',
            imageAlt: callout.image_alt || '',
            pageTitle: callout.page_content?.title || '',
            pageSubtitle: callout.page_content?.subtitle || '',
            pageImagePath: callout.page_content?.imagePath || '',
            pageImageAlt: callout.page_content?.imageAlt || '',
            buttonText: callout.page_content?.button?.text || '',
            buttonLink: callout.page_content?.button?.link || '',
            content: callout.page_content?.content || [{ type: 'paragraph', text: '' }],
        });
        setShowModal(true);
    };

    const handleDelete = async (callout: Callout) => {
        if (!confirm('Are you sure you want to delete this callout?')) return;
        
        setIsDeleting(true);
        try {
            const { error } = await supabase
                .from('callouts')
                .delete()
                .eq('id', callout.id);

            if (error) throw error;

            // Refresh the callouts list
            const { data: updatedCallouts, error: fetchError } = await supabase
                .from('callouts')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            setCallouts(updatedCallouts || []);
            alert('Callout deleted successfully');
        } catch (error: any) {
            console.error('Error deleting callout:', error);
            alert('Error deleting callout: ' + error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSave = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (isSaving) return;

        setIsSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                throw new Error('User must be authenticated');
            }

            console.log('Starting save operation:', editingCallout ? 'update' : 'create');
            console.log('Form data:', formData);

            const pageContent: PageContent = {
                title: formData.pageTitle || formData.name,
                subtitle: formData.pageSubtitle || formData.description,
                imagePath: formData.pageImagePath || formData.imageSrc,
                imageAlt: formData.pageImageAlt || formData.imageAlt,
                content: formData.content,
                ...(formData.buttonText && formData.buttonLink ? {
                    button: {
                        text: formData.buttonText,
                        link: formData.buttonLink
                    }
                } : {})
            };

            let result;
            
            if (editingCallout) {
                console.log('Updating callout with ID:', editingCallout.id);
                const updateData = {
                    title: formData.name,
                    description: formData.description,
                    name: formData.name,
                    slug: formData.slug,
                    image_src: formData.imageSrc,
                    image_alt: formData.imageAlt,
                    page_content: pageContent,
                    updated_at: new Date().toISOString(),
                };
                
                console.log('Update payload:', updateData);
                
                result = await supabase
                    .from('callouts')
                    .update(updateData)
                    .eq('id', editingCallout.id)
                    .select();

                console.log('Update result:', result);

                if (result.error) {
                    console.error('Error updating callout:', result.error);
                    throw result.error;
                }

                if (!result.data || result.data.length === 0) {
                    throw new Error('No data returned after update');
                }

                console.log('Successfully updated callout:', result.data[0]);
            } else {
                console.log('Creating new callout');
                
                // Add new callout
                result = await supabase
                    .from('callouts')
                    .insert({
                        title: formData.name,
                        description: formData.description,
                        name: formData.name,
                        slug: formData.slug,
                        image_src: formData.imageSrc,
                        image_alt: formData.imageAlt,
                        page_content: pageContent,
                    })
                    .select();

                if (result.error) {
                    console.error('Error creating callout:', result.error);
                    throw result.error;
                }

                console.log('Successfully created callout:', result.data?.[0]);
            }

            // Refresh the callouts list
            console.log('Fetching updated callouts list');
            const { data: updatedCallouts, error: fetchError } = await supabase
                .from('callouts')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) {
                console.error('Error fetching updated callouts:', fetchError);
                throw fetchError;
            }

            console.log('Successfully fetched updated callouts:', updatedCallouts?.length || 0, 'items');

            // Update UI
            setCallouts(updatedCallouts || []);
            setShowModal(false);
            setEditingCallout(null);
            setFormData({
                name: '',
                description: '',
                slug: '',
                imageSrc: '',
                imageAlt: '',
                pageTitle: '',
                pageSubtitle: '',
                pageImagePath: '',
                pageImageAlt: '',
                buttonText: '',
                buttonLink: '',
                content: [{ type: 'paragraph', text: '' }],
            });
        } catch (error: any) {
            console.error('Error in handleSave:', error);
            alert(`Error ${editingCallout ? 'updating' : 'creating'} callout: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleContentChange = (index: number, value: string) => {
        const newContent = [...formData.content];
        newContent[index] = { ...newContent[index], text: value };
        setFormData({ ...formData, content: newContent });
    };

    const addContentBlock = () => {
        setFormData({
            ...formData,
            content: [...formData.content, { type: 'paragraph', text: '' }],
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header with Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Callouts</h1>
                    <button
                        onClick={() => {
                            setEditingCallout(null);
                            setFormData({
                                name: '',
                                description: '',
                                slug: '',
                                imageSrc: '',
                                imageAlt: '',
                                pageTitle: '',
                                pageSubtitle: '',
                                pageImagePath: '',
                                pageImageAlt: '',
                                buttonText: '',
                                buttonLink: '',
                                content: [{ type: 'paragraph', text: '' }],
                            });
                            setShowModal(true);
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 
                                 text-white rounded-md shadow-sm transition-colors duration-200 gap-2"
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span>Add Callout</span>
                    </button>
                </div>

                {/* Callouts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {callouts.map((callout) => (
                        <motion.div
                            key={callout.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative bg-gray-800 rounded-lg shadow-md overflow-hidden 
                                     hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={callout.image_src || '/placeholder.jpg'}
                                    alt={callout.image_alt}
                                    className="object-cover w-full h-48"
                                />
                            </div>
                            <div className="p-4 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                                    {callout.name}
                                </h3>
                                <p className="text-gray-300 text-sm sm:text-base line-clamp-2">
                                    {callout.description}
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                    Slug: {callout.slug}
                                </p>
                            </div>
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    onClick={() => handleEdit(callout)}
                                    className="p-2 bg-gray-900 bg-opacity-75 rounded-full
                                             hover:bg-opacity-100 transition-all duration-200 text-white"
                                >
                                    <PencilSquareIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(callout)}
                                    className="p-2 bg-red-600 bg-opacity-75 rounded-full
                                             hover:bg-opacity-100 transition-all duration-200 text-white"
                                    disabled={isDeleting}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-auto">
                        <div className="p-4 sm:p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-white">
                                    {editingCallout ? 'Edit Callout' : 'Add New Callout'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Form */}
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Name (Title)"
                                        className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Description (Subtitle)"
                                        className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Slug (URL-friendly name)"
                                        className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={formData.slug}
                                        onChange={e => {
                                            const slug = e.target.value
                                                .toLowerCase()
                                                .replace(/[^a-z0-9]+/g, '-')
                                                .replace(/(^-|-$)/g, '');
                                            setFormData({ ...formData, slug });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Image URL"
                                        className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={formData.imageSrc}
                                        onChange={e => setFormData({ ...formData, imageSrc: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Image Alt Text"
                                        className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={formData.imageAlt}
                                        onChange={e => setFormData({ ...formData, imageAlt: e.target.value })}
                                    />

                                    {/* Page Content Fields */}
                                    <div className="border-t border-gray-700 pt-4 mt-4">
                                        <h3 className="text-lg font-semibold text-white mb-4">Page Content</h3>
                                        <input
                                            type="text"
                                            placeholder="Page Title (optional, defaults to Name)"
                                            className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
                                            value={formData.pageTitle}
                                            onChange={e => setFormData({ ...formData, pageTitle: e.target.value })}
                                        />
                                        <textarea
                                            placeholder="Page Subtitle (optional, defaults to Description)"
                                            className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
                                            value={formData.pageSubtitle}
                                            onChange={e => setFormData({ ...formData, pageSubtitle: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Page Image Path (optional, defaults to Card Image)"
                                            className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
                                            value={formData.pageImagePath}
                                            onChange={e => setFormData({ ...formData, pageImagePath: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Page Image Alt Text (optional, defaults to Card Image Alt)"
                                            className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
                                            value={formData.pageImageAlt}
                                            onChange={e => setFormData({ ...formData, pageImageAlt: e.target.value })}
                                        />
                                        
                                        {/* Button Fields */}
                                        <div className="border-t border-gray-700 pt-4 mt-4">
                                            <h4 className="text-md font-semibold text-white mb-4">Call-to-Action Button</h4>
                                            <input
                                                type="text"
                                                placeholder="Button Text (e.g., 'Learn More')"
                                                className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
                                                value={formData.buttonText}
                                                onChange={e => setFormData({ ...formData, buttonText: e.target.value })}
                                            />
                                            <input
                                                type="url"
                                                placeholder="Button Link (e.g., 'https://example.com')"
                                                className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                value={formData.buttonLink}
                                                onChange={e => setFormData({ ...formData, buttonLink: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Content Blocks */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-white">Content Blocks</h3>
                                        {formData.content.map((block, index) => (
                                            <div key={index} className="space-y-2">
                                                <select
                                                    className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                    value={block.type}
                                                    onChange={e => {
                                                        const newContent = [...formData.content];
                                                        newContent[index] = {
                                                            ...newContent[index],
                                                            type: e.target.value as any,
                                                        };
                                                        setFormData({ ...formData, content: newContent });
                                                    }}
                                                >
                                                    <option value="paragraph">Paragraph</option>
                                                    <option value="heading">Heading</option>
                                                    <option value="list">List</option>
                                                </select>
                                                <textarea
                                                    className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                    placeholder="Content text"
                                                    value={block.text}
                                                    onChange={e => handleContentChange(index, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            className="w-full p-2 bg-gray-800 hover:bg-gray-700 text-white rounded border border-gray-700"
                                            onClick={addContentBlock}
                                        >
                                            + Add Content Block
                                        </button>
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                    <div className="relative overflow-hidden py-8 sm:py-16">
                                        <div className="relative px-4 sm:px-6 lg:px-8">
                                            <div className="mx-auto max-w-2xl text-center">
                                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                                    {formData.pageTitle || formData.name || 'Your Title Here'}
                                                </h1>
                                                <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-8 text-gray-300">
                                                    {formData.pageSubtitle || formData.description || 'Your Description Here'}
                                                </p>
                                                {formData.buttonText && formData.buttonLink && (
                                                    <div className="mt-6">
                                                        <a
                                                            href={formData.buttonLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors duration-200"
                                                        >
                                                            {formData.buttonText}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {formData.imageSrc && (
                                            <div className="mt-8 sm:mt-16">
                                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                    <div className="relative overflow-hidden rounded-xl bg-black px-6 py-10 sm:py-20">
                                                        <img
                                                            className="mx-auto max-w-lg rounded-2xl object-cover"
                                                            src={formData.imageSrc}
                                                            alt={formData.imageAlt}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mx-auto mt-8 sm:mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
                                            <div className="mx-auto max-w-2xl lg:mx-0">
                                                {formData.content.map((block, index) => {
                                                    switch (block.type) {
                                                        case 'heading':
                                                            return (
                                                                <h2 key={index} className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                                                                    {block.text}
                                                                </h2>
                                                            );
                                                        case 'paragraph':
                                                            return (
                                                                <p key={index} className="mt-4 sm:mt-6 text-base sm:text-lg leading-8 text-gray-300">
                                                                    {block.text}
                                                                </p>
                                                            );
                                                        case 'list':
                                                            return (
                                                                <div key={index} className="mt-4 sm:mt-6">
                                                                    <h3 className="text-lg font-semibold text-white">{block.text}</h3>
                                                                    <ul className="mt-4 list-disc pl-6 text-base text-gray-300">
                                                                        {block.items?.map((item, itemIndex) => (
                                                                            <li key={itemIndex} className="mt-2">{item}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            );
                                                        default:
                                                            return null;
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 mt-6">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
                                    onClick={() => setShowModal(false)}
                                    disabled={isSaving}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded disabled:opacity-50 flex items-center gap-2"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        editingCallout ? 'Save Changes' : 'Add Callout'
                                    )}
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
