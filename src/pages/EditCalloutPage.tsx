// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// import { supabase } from '../../lib/supabase';

// type Callout = {
//     id: string;
//     name: string;
//     description: string;
//     slug: string;
//     image_src: string;
//     image_alt: string;
// };

// export default function EditCalloutPage() {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [callout, setCallout] = useState<Callout | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [saving, setSaving] = useState(false);

//     useEffect(() => {
//         async function loadCallout() {
//             if (!id) return;

//             try {
//                 setLoading(true);
//                 setError(null);

//                 if (id === 'new') {
//                     setCallout({
//                         id: 'new',
//                         name: '',
//                         description: '',
//                         slug: '',
//                         image_src: '',
//                         image_alt: ''
//                     });
//                     return;
//                 }

//                 const { data, error } = await supabase
//                     .from('callouts')
//                     .select()
//                     .eq('id', id)
//                     .single();

//                 if (error) {
//                     throw error;
//                 }

//                 if (!data) {
//                     throw new Error('Callout not found');
//                 }

//                 setCallout(data);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         loadCallout();
//     }, [id]);

//     const handleSave = async () => {
//         if (!callout) return;

//         try {
//             setSaving(true);
//             setError(null);

//             if (id === 'new') {
//                 const { error } = await supabase
//                     .from('callouts')
//                     .insert([{
//                         name: callout.name,
//                         description: callout.description,
//                         slug: callout.slug,
//                         image_src: callout.image_src,
//                         image_alt: callout.image_alt
//                     }]);

//                 if (error) throw error;
//             } else {
//                 const { error } = await supabase
//                     .from('callouts')
//                     .update({
//                         name: callout.name,
//                         description: callout.description,
//                         slug: callout.slug,
//                         image_src: callout.image_src,
//                         image_alt: callout.image_alt
//                     })
//                     .eq('id', id);

//                 if (error) throw error;
//             }

//             navigate('/admin');
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

//     if (!callout) {
//         return (
//             <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">No callout found</p>
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
//             <div className="max-w-3xl mx-auto">
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
//                             Name
//                         </label>
//                         <input
//                             type="text"
//                             value={callout.name}
//                             onChange={e => setCallout({ ...callout, name: e.target.value })}
//                             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Description
//                         </label>
//                         <textarea
//                             value={callout.description}
//                             onChange={e => setCallout({ ...callout, description: e.target.value })}
//                             rows={3}
//                             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Slug
//                         </label>
//                         <input
//                             type="text"
//                             value={callout.slug}
//                             onChange={e => setCallout({ ...callout, slug: e.target.value })}
//                             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Image URL
//                         </label>
//                         <input
//                             type="text"
//                             value={callout.image_src}
//                             onChange={e => setCallout({ ...callout, image_src: e.target.value })}
//                             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Image Alt Text
//                         </label>
//                         <input
//                             type="text"
//                             value={callout.image_alt}
//                             onChange={e => setCallout({ ...callout, image_alt: e.target.value })}
//                             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
