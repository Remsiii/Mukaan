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
            alert('❌ Bitte gib einen Titel ein');
            return;
        }

        try {
            if (isNew) {
                // Erst den Callout erstellen
                const { error: calloutError } = await supabase
                    .from('callouts')
                    .insert({
                        slug,
                        category: selectedCategory,
                        name: titleToSave,
                        description: titleToSave,
                        image_src: '',
                        image_alt: titleToSave,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    })
                    .select()
                    .single();

                if (calloutError) {
                    console.error('Callout creation error:', calloutError);
                    throw calloutError;
                }

                // Dann den HTML-Content erstellen
                const { error: htmlError } = await supabase
                    .from('calloutshtml')
                    .insert({
                        slug,
                        html_content: newContent,
                        updated_at: new Date().toISOString(),
                        title: titleToSave
                    });

                if (htmlError) throw htmlError;
            } else {
                // Update existing content
                const { error: htmlError } = await supabase
                    .from('calloutshtml')
                    .update({
                        html_content: newContent,
                        updated_at: new Date().toISOString(),
                        slug_suffix: slugSuffix,
                        title: titleToSave
                    })
                    .eq('slug', slug);

                if (htmlError) throw htmlError;

                const { error: calloutError } = await supabase
                    .from('callouts')
                    .update({
                        category: selectedCategory,
                        name: titleToSave,
                        updated_at: new Date().toISOString()
                    })
                    .eq('slug', slug);

                if (calloutError) throw calloutError;
            }

            navigate('/admin');
        } catch (error: any) {
            console.error('Error saving:', error);
            if (error.code === '42501' || error.code === '401') {
                alert('❌ Sitzung abgelaufen. Bitte melden Sie sich erneut an.');
                navigate('/login');
            } else {
                alert('❌ Fehler beim Speichern: ' + error.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[100dvh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-[100dvh] w-full overflow-hidden touch-pan-y">
            <div className="max-w-full sm:max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 sm:mb-6">
                    <button
                        onClick={() => navigate('/admin')}
                        className="text-blue-500 hover:text-blue-600 text-sm sm:text-base flex items-center"
                    >
                        ← Zurück
                    </button>
                    <div className="text-xs sm:text-sm text-gray-500 break-all">
                        Artikel-ID: {slug}{slugSuffix > 0 ? `-${slugSuffix}` : ''}
                    </div>
                </div>

                {/* Kategorie-Auswahl */}
                <div className="mb-4 sm:mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kategorie
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {categories.filter(cat => cat.id !== 'all').map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`inline-flex items-center px-2 py-1 rounded-md text-xs sm:text-sm transition-colors ${selectedCategory === category.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="w-3.5 h-3.5 sm:w-4 sm:h-4">{category.icon}</span>
                                <span className="ml-1">{category.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rich Text Editor with mobile optimization */}
                <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="w-full max-w-full overflow-x-hidden">
                        <RichTextEditor
                            initialContent={content}
                            onSave={handleSave}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
