// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// import { supabase } from '../../lib/supabase';

// type PageContent = {
//     id: string;
//     slug: string;
//     title: string;
//     content: string;
//     meta_description: string;
//     meta_keywords: string;
//     header_image: string;
//     updated_at?: string;
// };

// export default function EditPageContent() {
//     const navigate = useNavigate();
//     const { slug } = useParams();
//     const [content, setContent] = useState<PageContent | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [saving, setSaving] = useState(false);

//     useEffect(() => {
//         async function loadContent() {
//             if (!slug) return;

//             try {
//                 setLoading(true);
//                 setError(null);

//                 if (slug === 'new') {
//                     setContent({
//                         id: 'new',
//                         slug: '',
//                         title: '',
//                         content: '',
//                         meta_description: '',
//                         meta_keywords: '',
//                         header_image: ''
//                     });
//                     return;
//                 }

//                 const { data, error } = await supabase
//                     .from('page_contents')
//                     .select()
//                     .eq('slug', slug)
//                     .single();

//                 if (error) {
//                     throw error;
//                 }

//                 if (!data) {
//                     throw new Error('Page content not found');
//                 }

//                 setContent(data);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         loadContent();
//     }, [slug]);

//     const handleSave = async () => {
//         if (!content) return;

//         try {
//             setSaving(true);
//             setError(null);

//             if (slug === 'new') {
//                 const { error } = await supabase
//                     .from('page_contents')
//                     .insert([{
//                         slug: content.slug,
//                         title: content.title,
//                         content: content.content,
//                         meta_description: content.meta_description,
//                         meta_keywords: content.meta_keywords,
//                         header_image: content.header_image
//                     }]);

//                 if (error) throw error;
//             } else {
//                 const { error } = await supabase
//                     .from('page_contents')
//                     .update({
//                         title: content.title,
//                         content: content.content,
//                         meta_description: content.meta_description,
//                         meta_keywords: content.meta_keywords,
//                         header_image: content.header_image
//                     })
//                     .eq('slug', slug);

//                 if (error) throw error;
//             }

//             navigate(`/${content.slug}`);
//         } catch (err: any) {
//             setError(err.message);
//         } finally {
//             setSaving(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-red-600 dark:text-red-400 text-xl mb-4">{error}</p>
//                     <button
//                         onClick={() => navigate('/admin')}
//                         className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//                     >
//                         Back to Admin
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     if (!content) {
//         return (
//             <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">No page content found</p>
//                     <button
//                         onClick={() => navigate('/admin')}
//                         className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//                     >
//                         Back to Admin
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
//             <div className="max-w-4xl mx-auto">
//                 <div className="flex justify-between items-center mb-8">
//                     <button
//                         onClick={() => navigate('/admin')}
//                         className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
//                     >
//                         <ArrowLeftIcon className="h-5 w-5 mr-2" />
//                         Back
//                     </button>
//                     <button
//                         onClick={handleSave}
//                         disabled={saving}
//                         className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
//                     >
//                         {saving ? 'Saving...' : 'Save Changes'}
//                     </button>
//                 </div>

//                 {error && (
//                     <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//                         {error}
//                     </div>
//                 )}

//                 <div className="space-y-6">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Title
//                         </label>
//                         <input
//                             type="text"
//                             value={content.title}
//                             onChange={e => setContent({ ...content, title: e.target.value })}
//                             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Content
//                         </label>
//                         <textarea
//                             value={content.content}
//                             onChange={e => setContent({ ...content, content: e.target.value })}
//                             rows={10}
//                             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Meta Description
//                         </label>
//                         <textarea
//                             value={content.meta_description}
//                             onChange={e => setContent({ ...content, meta_description: e.target.value })}
//                             rows={2}
//                             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Meta Keywords
//                         </label>
//                         <input
//                             type="text"
//                             value={content.meta_keywords}
//                             onChange={e => setContent({ ...content, meta_keywords: e.target.value })}
//                             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                             placeholder="Comma-separated keywords"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Header Image URL
//                         </label>
//                         <input
//                             type="text"
//                             value={content.header_image}
//                             onChange={e => setContent({ ...content, header_image: e.target.value })}
//                             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                         />
//                     </div>

//                     {content.header_image && (
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                 Image Preview
//                             </label>
//                             <img
//                                 src={content.header_image}
//                                 alt="Header preview"
//                                 className="max-w-full h-auto rounded-lg shadow-lg"
//                             />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
