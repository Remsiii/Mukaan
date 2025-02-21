import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import RichTextEditor from '../../components/RichTextEditor'
import { GridIcon, LightbulbIcon, MonitorIcon, TagIcon, AppWindow } from "lucide-react";

const DEFAULT_CONTENT = `
<h1>👋 Willkommen zum neuen Artikel!</h1>
<p>Hier kannst du deinen Artikel schreiben. Einige Beispiele für die Formatierung:</p>

<h2>🎯 Überschriften</h2>
<p>Nutze H1 für den Haupttitel und H2 für Untertitel.</p>

<h2>📝 Aufzählungen</h2>
<ul>
  <li>Erster Punkt</li>
  <li>Zweiter Punkt</li>
  <li>Dritter Punkt</li>
</ul>

<h2>🖼️ Bilder</h2>
<p>Füge Bilder über den Image-Button in der Toolbar ein.</p>
<img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" alt="Beispielbild" />

<h2>🔗 Links</h2>
<p>Verlinke auf andere Seiten mit dem Link-Button.</p>

<p>Klicke auf "Save Content" um deinen Artikel zu speichern!</p>
`

const categories = [
    { id: "all", label: "Alle", icon: <GridIcon className="w-4 h-4" /> },
    { id: "tipps", label: "Tipps", icon: <LightbulbIcon className="w-4 h-4" /> },
    { id: "pc", label: "PC", icon: <MonitorIcon className="w-4 h-4" /> },
    { id: "angebote", label: "Angebote", icon: <TagIcon className="w-4 h-4" /> },
    { id: "apps", label: "Apps", icon: <AppWindow className="w-4 h-4" /> },
];

export default function EditCalloutDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()
    const [content, setContent] = useState(DEFAULT_CONTENT)
    const [loading, setLoading] = useState(true)
    const [slugSuffix, setSlugSuffix] = useState<number>(0)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [title, setTitle] = useState("")

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Lade HTML Content
                const { data: htmlData } = await supabase
                    .from('calloutshtml')
                    .select('html_content, slug_suffix, title')
                    .eq('slug', slug)
                    .single()

                // Lade Callout Daten für Kategorie
                const { data: calloutData } = await supabase
                    .from('callouts')
                    .select('category')
                    .eq('slug', slug)
                    .single()

                if (htmlData?.html_content) {
                    setContent(htmlData.html_content)
                    setSlugSuffix(htmlData.slug_suffix || 0)
                    setTitle(htmlData.title || '')
                }
                if (calloutData?.category) {
                    setSelectedCategory(calloutData.category)
                }
            } catch (error) {
                console.log('Kein existierender Content gefunden, verwende Default')
            } finally {
                setLoading(false)
            }
        }
        loadContent()
    }, [slug])

    const handleSave = async (newContent: string) => {
        if (!title.trim()) {
            alert('❌ Bitte gib einen Titel ein')
            return
        }

        try {
            // Check if callout exists
            const { data: existingCallout } = await supabase
                .from('callouts')
                .select('id')
                .eq('slug', slug)
                .single()

            if (existingCallout) {
                // Update existing entries
                const { error: htmlError } = await supabase
                    .from('calloutshtml')
                    .upsert({
                        slug,
                        html_content: newContent,
                        updated_at: new Date().toISOString(),
                        slug_suffix: slugSuffix,
                        title: title.trim()
                    }, { onConflict: 'slug' })

                if (htmlError) throw htmlError

                const { error: calloutError } = await supabase
                    .from('callouts')
                    .update({ category: selectedCategory })
                    .eq('slug', slug)

                if (calloutError) throw calloutError
            } else {
                // Create new entries
                const { error: calloutError } = await supabase
                    .from('callouts')
                    .insert({
                        slug,
                        category: selectedCategory
                    })

                if (calloutError) throw calloutError

                const { error: htmlError } = await supabase
                    .from('calloutshtml')
                    .insert({
                        slug,
                        html_content: newContent,
                        updated_at: new Date().toISOString(),
                        slug_suffix: slugSuffix,
                        title: title.trim()
                    })

                if (htmlError) throw htmlError
            }

            navigate('/admin')
        } catch (error) {
            console.error('Error saving:', error)
            alert('❌ Fehler beim Speichern')
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
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
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

            {/* Title Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titel
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Artikel Titel eingeben..."
                    required
                />
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
