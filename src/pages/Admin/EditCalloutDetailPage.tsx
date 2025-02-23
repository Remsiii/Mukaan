import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import RichTextEditor from '../../components/RichTextEditor'
import { GridIcon, LightbulbIcon, MonitorIcon, TagIcon, AppWindow } from "lucide-react";
import { useAuth } from '../../context/AuthContext'; // Add this import

const categories = [
    { id: "all", label: "Alle", icon: <GridIcon className="w-4 h-4" /> },
    { id: "tipps", label: "Tipps", icon: <LightbulbIcon className="w-4 h-4" /> },
    { id: "pc", label: "PC", icon: <MonitorIcon className="w-4 h-4" /> },
    { id: "angebote", label: "Angebote", icon: <TagIcon className="w-4 h-4" /> },
    { id: "apps", label: "Apps", icon: <AppWindow className="w-4 h-4" /> },
];

const extractTitleFromHTML = (htmlContent: string): string => {
    const match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
    return match ? match[1].trim() : '';
};

export default function EditCalloutDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const [searchParams] = useSearchParams();
    const isNew = searchParams.get('isNew') === 'true';
    const { isAuthenticated } = useAuth(); // Add this
    const navigate = useNavigate()
    const [content, setContent] = useState('')  // Changed to empty string
    const [loading, setLoading] = useState(true)
    const [slugSuffix, setSlugSuffix] = useState<number>(0)
    const [selectedCategory, setSelectedCategory] = useState("tipps") // Default category for new callouts
    const [title, setTitle] = useState("")

    // Add authentication check
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const loadContent = async () => {
            if (isNew) {
                setLoading(false);
                return;  // Don't set any initial content for new articles
            }

            try {
                const { data: htmlData } = await supabase
                    .from('calloutshtml')
                    .select('html_content, slug_suffix, title')
                    .eq('slug', slug)
                    .single()

                const { data: calloutData } = await supabase
                    .from('callouts')
                    .select('category')
                    .eq('slug', slug)
                    .single()

                if (htmlData?.html_content) {
                    setContent(htmlData.html_content)
                    setSlugSuffix(htmlData.slug_suffix || 0)
                    const extractedTitle = extractTitleFromHTML(htmlData.html_content);
                    setTitle(extractedTitle || htmlData.title || '')
                }
                if (calloutData?.category) {
                    setSelectedCategory(calloutData.category)
                }
            } catch (error) {
                console.log('Kein existierender Content gefunden')
                setTitle('')
            } finally {
                setLoading(false)
            }
        }
        loadContent()
    }, [slug, isNew])

    const handleSave = async (newContent: string) => {
        if (!isAuthenticated) {
            alert('❌ Nicht authentifiziert');
            navigate('/login');
            return;
        }

        const extractedTitle = extractTitleFromHTML(newContent);
        const titleToSave = extractedTitle || title;

        if (!titleToSave.trim()) {
            alert('❌ Bitte gib einen Titel ein')
            return
        }

        try {
            if (isNew) {
                // Create new callout
                const { error: calloutError } = await supabase
                    .from('callouts')
                    .insert({
                        slug,
                        category: selectedCategory,
                        name: titleToSave,
                        description: ''
                    })
                    .select()  // Add select() to return the inserted row

                if (calloutError) throw calloutError;

                // Create HTML content with upsert
                const { error: htmlError } = await supabase
                    .from('calloutshtml')
                    .upsert({
                        slug,
                        html_content: newContent,
                        updated_at: new Date().toISOString(),
                        title: titleToSave
                    }, {
                        onConflict: 'slug'
                    })
                    .select()  // Add select() to return the upserted row

                if (htmlError) throw htmlError;
            } else {
                // Update existing callout with upsert
                const { error: htmlError } = await supabase
                    .from('calloutshtml')
                    .upsert({
                        slug,
                        html_content: newContent,
                        updated_at: new Date().toISOString(),
                        slug_suffix: slugSuffix,
                        title: titleToSave
                    }, {
                        onConflict: 'slug'
                    })
                    .select()  // Add select() to return the upserted row

                if (htmlError) throw htmlError

                const { error: calloutError } = await supabase
                    .from('callouts')
                    .update({
                        category: selectedCategory,
                        name: titleToSave
                    })
                    .eq('slug', slug)
                    .select()  // Add select() to return the updated row

                if (calloutError) throw calloutError
            }

            navigate('/admin')
        } catch (error: any) {
            console.error('Error saving:', error)
            alert('❌ Fehler beim Speichern: ' + error.message)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6 overflow-x-hidden">
            <div className="flex justify-between items-center mb-6 mt-5">
                <button
                    onClick={() => navigate('/admin')}
                    className="text-blue-500 hover:text-blue-600"
                >
                    ← Zurück
                </button>
                <div className="text-sm text-gray-500">
                    Artikel-ID: {slug}{slugSuffix > 0 ? `-${slugSuffix}` : ''}
                </div>
            </div>

            {/* Kategorie-Auswahl */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategorie
                </label>
                <div className="flex gap-2 flex-wrap">
                    {categories.filter(cat => cat.id !== 'all').map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`inline-flex items-center px-3 py-2 rounded-md ${selectedCategory === category.id
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.icon}
                            <span className="ml-2">{category.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <RichTextEditor
                initialContent={content}
                onSave={handleSave}
            />
        </div>
    )
}
