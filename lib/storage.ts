import { supabase } from './supabase';

export const uploadImage = async (
  file: File,
  bucket: 'card-images' | 'page-images',
  path: string
) => {
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User must be authenticated to upload files');
  }

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${path}/${Date.now()}_${file.name}`, file, { upsert: true });

  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl;
};
