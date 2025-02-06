import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { auth, subscribeToAuthChanges, type Profile } from '../lib/auth';
import LoadingScreen from '../components/LoadingScreen';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  PlusIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
  Bars3Icon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/storage';

type ContentBlock = {
  text: string;
  type: 'paragraph' | 'heading' | 'list' | 'image';
  items?: string[];
  imagePath?: string;
  imageAlt?: string;
}

type Button = {
  text: string;
  link: string;
}

type Callout = {
  id: string;
  name: string;
  description: string;
  slug: string;
  imageSrc: string;
  imageAlt: string;
  pageContent: {
    title: string;
    subtitle: string;
    imagePath: string;
    imageAlt: string;
    content: ContentBlock[];
    button?: Button;
  };
  created_at: string;
  updated_at: string;
};

const AdminPage = () => {
  usePageTitle('Admin');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [callouts, setCallouts] = useState<Callout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCallout, setCurrentCallout] = useState<Callout | null>(null);
  const [uploadProgressCard, setUploadProgressCard] = useState(0);
  const [uploadProgressPage, setUploadProgressPage] = useState(0);
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const [pageImageUrl, setPageImageUrl] = useState<string | null>(null);

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      const userProfile = await auth.getProfile();
      setProfile(userProfile);
      setLoading(false);
    };
    checkAuth();

    const unsubscribe = subscribeToAuthChanges((newProfile) => {
      setProfile(newProfile);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch callouts
  useEffect(() => {
    const fetchCallouts = async () => {
      const { data, error } = await supabase
        .from('callouts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching callouts:', error);
        return;
      }

      // Map database columns to frontend model
      const mappedCallouts = data.map(callout => ({
        id: callout.id,
        name: callout.name,
        description: callout.description,
        slug: callout.slug,
        imageSrc: callout.image_src,
        imageAlt: callout.image_alt,
        pageContent: callout.page_content,
        created_at: callout.created_at,
        updated_at: callout.updated_at
      }));

      setCallouts(mappedCallouts);
    };

    fetchCallouts();
  }, []);

  const handleAddCallout = async (calloutData: Omit<Callout, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('callouts')
        .insert([{
          name: calloutData.name,
          description: calloutData.description,
          slug: calloutData.slug,
          image_src: calloutData.imageSrc,
          image_alt: calloutData.imageAlt,
          page_content: calloutData.pageContent
        }])
        .select();

      if (error) throw error;

      setCallouts([...(data || []), ...callouts]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding callout:', error);
      alert('Error adding callout');
    }
  };

  const handleEditCallout = async (id: string, calloutData: Partial<Callout>) => {
    try {
      const { error } = await supabase
        .from('callouts')
        .update({
          name: calloutData.name,
          description: calloutData.description,
          slug: calloutData.slug,
          image_src: calloutData.imageSrc,
          image_alt: calloutData.imageAlt,
          page_content: calloutData.pageContent
        })
        .eq('id', id);

      if (error) throw error;

      setCallouts(callouts.map(callout =>
        callout.id === id ? { ...callout, ...calloutData } : callout
      ));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating callout:', error);
      alert('Error updating callout');
    }
  };

  const handleDeleteCallout = async (id: string) => {
    const { error } = await supabase
      .from('callouts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting callout:', error);
      return;
    }

    setCallouts(callouts.filter(c => c.id !== id));
  };

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;

    // Log user authentication status
    const { data: { user } } = await supabase.auth.getUser();
    console.log('User:', user);

    try {
      setUploadProgressCard(10);
      const url = await uploadImage(file, 'card-images', 'callouts');
      setCardImageUrl(url);
      setUploadProgressCard(100);

      // Show preview
      const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
      if (imagePreview) imagePreview.src = url;
    } catch (error) {
      console.error('Failed to upload card image:', error);
      alert('Failed to upload image');
      setUploadProgressCard(0);
    }
  };

  const handlePageImageUpload = async (file: File | null) => {
    if (!file) return;

    // Log user authentication status
    const { data: { user } } = await supabase.auth.getUser();
    console.log('User:', user);

    try {
      setUploadProgressPage(10);
      const url = await uploadImage(file, 'page-images', 'callouts');
      setPageImageUrl(url);
      setUploadProgressPage(100);

      // Show preview
      const imagePreview = document.getElementById('pageImagePreview') as HTMLImageElement;
      if (imagePreview) imagePreview.src = url;
    } catch (error) {
      console.error('Failed to upload page image:', error);
      alert('Failed to upload image');
      setUploadProgressPage(0);
    }
  };

  if (loading) return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
  if (!profile?.role || profile.role !== 'admin') return <Navigate to="/" />;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* <Dialog.Overlay className="fixed inset-0 bg-gray-900/80" /> */}
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex w-full flex-col bg-white dark:bg-gray-800">
                  {/* Sidebar content */}
                  <div className="flex-1 overflow-y-auto px-6 pb-4 pt-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Admin Dashboard</h2>
                      <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex h-16 shrink-0 items-center">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          </div>
          {/* Sidebar content */}
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:bg-gray-800 dark:border-gray-700 sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden dark:text-gray-300"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Callouts list */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Callouts</h1>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  onClick={() => {
                    setCurrentCallout(null);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Callout
                </button>
              </div>
            </div>

            {/* Callouts grid/list */}
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Description
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Created
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900 dark:divide-gray-700">
                        {callouts.map((callout) => (
                          <tr key={callout.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                              {callout.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                              {callout.description}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                              {new Date(callout.created_at).toLocaleDateString()}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                onClick={() => {
                                  setCurrentCallout(callout);
                                  setIsModalOpen(true);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                              >
                                <PencilIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCallout(callout.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {currentCallout ? 'Edit Callout' : 'Add New Callout'}
                      </Dialog.Title>
                      <div className="mt-2">
                        <form className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                              defaultValue={currentCallout?.name}
                            />
                          </div>
                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                              defaultValue={currentCallout?.description}
                            />
                          </div>
                          <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                              Slug
                            </label>
                            <input
                              type="text"
                              name="slug"
                              id="slug"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                              defaultValue={currentCallout?.slug}
                            />
                          </div>
                          <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                              Card Image
                            </label>
                            <input
                              type="file"
                              name="image"
                              id="image"
                              accept="image/*"
                              className="mt-1 block w-full text-sm text-black"
                              onChange={handleImageUpload}
                            />
                            {(cardImageUrl || currentCallout?.imageSrc) && (
                              <img
                                id="imagePreview"
                                src={cardImageUrl || currentCallout?.imageSrc}
                                alt={currentCallout?.imageAlt || "Preview"}
                                className="mt-2 h-32 w-auto object-cover rounded-lg"
                              />
                            )}
                            {uploadProgressCard > 0 && uploadProgressCard < 100 && (
                              <div className="mt-2">
                                <div className="h-2 bg-gray-200 rounded">
                                  <div
                                    className="h-full bg-indigo-600 rounded transition-all"
                                    style={{ width: `${uploadProgressCard}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-500">
                                  {uploadProgressCard}% hochgeladen
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700">
                              Card Image Alt Text
                            </label>
                            <input
                              type="text"
                              name="imageAlt"
                              id="imageAlt"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                              defaultValue={currentCallout?.imageAlt}
                            />
                          </div>
                          <div className="border-t border-gray-200 pt-4">
                            <h4 className="text-lg font-medium text-gray-900">Page Content</h4>
                            <div className="mt-4 space-y-4">
                              <div>
                                <label htmlFor="pageTitle" className="block text-sm font-medium text-gray-700">
                                  Page Title
                                </label>
                                <input
                                  type="text"
                                  name="pageTitle"
                                  id="pageTitle"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                  defaultValue={currentCallout?.pageContent?.title}
                                />
                              </div>
                              <div>
                                <label htmlFor="pageSubtitle" className="block text-sm font-medium text-gray-700">
                                  Page Subtitle
                                </label>
                                <input
                                  type="text"
                                  name="pageSubtitle"
                                  id="pageSubtitle"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                  defaultValue={currentCallout?.pageContent?.subtitle}
                                />
                              </div>
                              <div>
                                <label htmlFor="pageImage" className="block text-sm font-medium text-gray-700">
                                  Page Image
                                </label>
                                <input
                                  type="file"
                                  name="pageImage"
                                  id="pageImage"
                                  accept="image/*"
                                  className="mt-1 block w-full text-sm text-black"
                                  onChange={handlePageImageUpload}
                                />
                                {(pageImageUrl || currentCallout?.pageContent?.imagePath) && (
                                  <img
                                    id="pageImagePreview"
                                    src={pageImageUrl || currentCallout?.pageContent?.imagePath}
                                    alt={currentCallout?.pageContent?.imageAlt || "Preview"}
                                    className="mt-2 h-32 w-auto object-cover rounded-lg"
                                  />
                                )}
                                {uploadProgressPage > 0 && uploadProgressPage < 100 && (
                                  <div className="mt-2">
                                    <div className="h-2 bg-gray-200 rounded">
                                      <div
                                        className="h-full bg-indigo-600 rounded transition-all"
                                        style={{ width: `${uploadProgressPage}%` }}
                                      />
                                    </div>
                                    <span className="text-sm text-gray-500">
                                      {uploadProgressPage}% hochgeladen
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <label htmlFor="pageImageAlt" className="block text-sm font-medium text-gray-700">
                                  Page Image Alt Text
                                </label>
                                <input
                                  type="text"
                                  name="pageImageAlt"
                                  id="pageImageAlt"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                  defaultValue={currentCallout?.pageContent?.imageAlt}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Content Blocks</label>
                                <div className="mt-2 space-y-4">
                                  {currentCallout?.pageContent?.content?.map((block, index) => (
                                    <div key={index} className="space-y-2">
                                      <select
                                        id={`contentType${index}`}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                        defaultValue={block.type}
                                      >
                                        <option value="paragraph">Paragraph</option>
                                        <option value="heading">Heading</option>
                                        <option value="list">List</option>
                                        <option value="image">Image</option>
                                      </select>
                                      <textarea
                                        id={`contentText${index}`}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                        defaultValue={block.text}
                                      />
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                    onClick={() => {
                                      const content = currentCallout?.pageContent?.content || [];
                                      content.push({ type: 'paragraph', text: '' });
                                      setCurrentCallout({
                                        ...currentCallout!,
                                        pageContent: {
                                          ...currentCallout!.pageContent,
                                          content
                                        }
                                      });
                                    }}
                                  >
                                    Add Content Block
                                  </button>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Button (Optional)</label>
                                <div className="mt-2 space-y-2">
                                  <input
                                    type="text"
                                    id="buttonText"
                                    placeholder="Button Text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                    defaultValue={currentCallout?.pageContent?.button?.text}
                                  />
                                  <input
                                    type="text"
                                    id="buttonLink"
                                    placeholder="Button Link"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                    defaultValue={currentCallout?.pageContent?.button?.link}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => {
                        const name = (document.getElementById('name') as HTMLInputElement).value;
                        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
                        const slug = (document.getElementById('slug') as HTMLInputElement).value;
                        const imageAlt = (document.getElementById('imageAlt') as HTMLInputElement).value;
                        const imageSrc = cardImageUrl || currentCallout?.imageSrc || '';
                        const pageImagePath = pageImageUrl || currentCallout?.pageContent?.imagePath || '';
                        const pageTitle = (document.getElementById('pageTitle') as HTMLInputElement).value;
                        const pageSubtitle = (document.getElementById('pageSubtitle') as HTMLInputElement).value;
                        const pageImageAlt = (document.getElementById('pageImageAlt') as HTMLInputElement).value;
                        const buttonText = (document.getElementById('buttonText') as HTMLInputElement).value;
                        const buttonLink = (document.getElementById('buttonLink') as HTMLInputElement).value;

                        // Get content blocks
                        const content: ContentBlock[] = [];
                        const currentContent = currentCallout?.pageContent?.content || [];
                        currentContent.forEach((_, index) => {
                          const type = (document.getElementById(`contentType${index}`) as HTMLSelectElement).value as ContentBlock['type'];
                          const text = (document.getElementById(`contentText${index}`) as HTMLTextAreaElement).value;
                          content.push({ type, text });
                        });

                        const updatedCallout = {
                          name,
                          description,
                          slug,
                          imageSrc,
                          imageAlt,
                          pageContent: {
                            title: pageTitle,
                            subtitle: pageSubtitle,
                            imagePath: pageImagePath,
                            imageAlt: pageImageAlt,
                            content,
                            button: buttonText && buttonLink ? {
                              text: buttonText,
                              link: buttonLink
                            } : undefined
                          }
                        };

                        if (currentCallout) {
                          handleEditCallout(currentCallout.id, updatedCallout);
                        } else {
                          handleAddCallout(updatedCallout);
                        }
                      }}
                    >
                      {currentCallout ? 'Save Changes' : 'Add Callout'}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default AdminPage;
