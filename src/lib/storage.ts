// import { supabase } from './supabase';

// export const uploadImage = async (
//   file: File,
//   bucket: 'card-images' | 'page-images',
//   path: string
// ) => {
//   // Check if user is authenticated
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) {
//     throw new Error('User must be authenticated to upload files');
//   }

//   const { data, error } = await supabase.storage
//     .from(bucket)
//     .upload(`${path}/${Date.now()}_${file.name}`, file, { upsert: true });

//   if (error) throw error;
//   const { data: { publicUrl } } = supabase.storage
//     .from(bucket)
//     .getPublicUrl(data.path);

//   return publicUrl;
// };

// // Temporary storage solution
// export const storage = {
//   async uploadFile(file: File): Promise<string> {
//     // For now, just return a fake URL
//     return URL.createObjectURL(file);
//   },

//   async getPublicUrl(path: string): Promise<string> {
//     return path;
//   }
// };

// export const db = {
//   async get(collection: string, id?: string) {
//     const data = localStorage.getItem(collection);
//     if (!data) return null;
//     const items = JSON.parse(data);
//     return id ? items[id] : items;
//   },

//   async set(collection: string, data: any, id?: string) {
//     if (id) {
//       const existing = await this.get(collection) || {};
//       existing[id] = data;
//       localStorage.setItem(collection, JSON.stringify(existing));
//     } else {
//       localStorage.setItem(collection, JSON.stringify(data));
//     }
//   }
// };
