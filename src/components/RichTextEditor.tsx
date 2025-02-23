import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Mark, mergeAttributes } from '@tiptap/core' // Change import
import { useState, useEffect, useRef } from 'react'
import EmojiPicker from 'emoji-picker-react'
import {
    BoldIcon,
    ItalicIcon,
    ListIcon,
    Heading1Icon,
    Heading2Icon,
    ImageIcon,
    SmileIcon,
    LinkIcon,
    Square, // Add this import for button icon
} from 'lucide-react'

interface RichTextEditorProps {
    initialContent: string
    onSave: (content: string) => void
}

const PLACEHOLDER = {
    heading: 'Gib deinem Artikel einen Titel...',
    text: 'Schreibe hier deinen Artikel. Nutze die Toolbar um Text zu formatieren, Listen zu erstellen oder Medien einzufügen.'
}

// Replace ButtonExtension with this new version
const ButtonMark = Mark.create({
    name: 'button',

    addOptions() {
        return {
            HTMLAttributes: {
                class: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block cursor-pointer',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-button]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-button': '' }), 0]
    },
})

export default function RichTextEditor({ initialContent, onSave }: RichTextEditorProps) {
    const [imageUrl, setImageUrl] = useState('')
    const [linkUrl, setLinkUrl] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [showLinkModal, setShowLinkModal] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Add useEffect to handle viewport meta tag
    useEffect(() => {
        // Find or create viewport meta tag
        let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
        if (!viewportMeta) {
            viewportMeta = document.createElement('meta');
            viewportMeta.setAttribute('name', 'viewport');
            document.head.appendChild(viewportMeta);
        }

        // Set viewport to prevent zooming
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');

        // Cleanup
        return () => {
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1');
        };
    }, []);

    // Add touch event handling
    useEffect(() => {
        let lastTap = 0;
        // Prevent pinch zoom
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        // Prevent double-tap zoom
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTap < 300) {
                e.preventDefault();
            }
            lastTap = now;
        }, { passive: false });

        return () => {
            document.removeEventListener('touchmove', () => { });
            document.removeEventListener('touchend', () => { });
        };
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: 'mb-4 whitespace-pre-wrap break-words',
                    },
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            Link.configure({
                openOnClick: true,
                validate: href => /^(https?:)?\/\//.test(href), // Only allow absolute URLs
                HTMLAttributes: {
                    target: '_blank', // Add this to open in new tab
                    rel: 'noopener noreferrer', // Add this for security
                    class: 'text-blue-400 hover:underline',
                },
            }),
            ButtonMark, // Use the new ButtonMark instead of ButtonExtension
        ],
        content: initialContent || `<h1>${PLACEHOLDER.heading}</h1><p>${PLACEHOLDER.text}</p>`,
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] prose-headings:text-white prose-p:text-white prose-strong:text-white prose-ul:text-white prose-li:text-white prose-ul:list-disc prose-ul:ml-4 prose-li:marker:text-white [&_p]:whitespace-pre-wrap [&_p]:break-words',
                style: 'font-size: 16px; touch-action: pan-y; overflow-x: hidden;',
            },
        },
    })

    // Add event handler to clear placeholder on first focus
    useEffect(() => {
        if (editor && !initialContent) {
            const handleFirstFocus = () => {
                if (editor.getText().includes(PLACEHOLDER.heading)) {
                    editor.commands.setContent('<h1></h1><p></p>')
                }
                editor.off('focus', handleFirstFocus)
            }

            editor.on('focus', handleFirstFocus)

            // Return a proper cleanup function
            return () => {
                if (editor) {
                    editor.off('focus', handleFirstFocus)
                }
            }
        }
    }, [editor, initialContent])

    const addImage = () => {
        setShowImageModal(true)
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && editor) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result) {
                    editor.chain().focus().setImage({ src: e.target.result as string }).run()
                }
            }
            reader.readAsDataURL(file)
        }
        setShowImageModal(false)
    }

    const handleImageUrl = () => {
        const url = imageUrl.trim()
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run()
        }
        setImageUrl('')
        setShowImageModal(false)
    }

    const addLink = () => {
        const selection = editor?.state.selection
        const selectedText = selection ? editor?.state.doc.textBetween(selection.from, selection.to) : ''

        if (selectedText) {
            setShowLinkModal(true)
        } else {
            alert('Bitte wähle zuerst einen Text aus, der verlinkt werden soll.')
        }
    }

    const handleLinkSubmit = () => {
        if (editor && linkUrl) {
            // Ensure URL has http:// or https:// prefix
            let finalUrl = linkUrl.trim()
            if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
                finalUrl = 'https://' + finalUrl
            }

            editor
                .chain()
                .focus()
                .setLink({ href: finalUrl })
                .run()
        }
        setLinkUrl('')
        setShowLinkModal(false)
    }

    const onEmojiClick = (emojiObject: any) => {
        if (editor) {
            editor.chain().focus().insertContent(emojiObject.emoji).run()
        }
        setShowEmojiPicker(false)
    }

    const addButton = () => {
        if (editor) {
            const selection = editor.state.selection
            const text = selection ? editor.state.doc.textBetween(selection.from, selection.to) : ''

            if (!text) {
                alert('Bitte wähle zuerst einen Text aus, der zu einem Button werden soll.')
                return
            }

            // Toggle button mark instead of wrapping
            editor
                .chain()
                .focus()
                .toggleMark('button')
                .run()
        }
    }

    if (!editor) return null

    return (
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 w-full max-w-full overflow-hidden">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-4 border-b border-gray-700 pb-4">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1.5 sm:p-2 rounded ${editor.isActive('bold') ? 'bg-gray-700' : ''}`}
                >
                    <BoldIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1.5 sm:p-2 rounded ${editor.isActive('italic') ? 'bg-gray-700' : ''}`}
                >
                    <ItalicIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-1.5 sm:p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700' : ''}`}
                >
                    <Heading1Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-1.5 sm:p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700' : ''}`}
                >
                    <Heading2Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-1.5 sm:p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-700' : ''}`}
                >
                    <ListIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                    onClick={addImage}
                    className="p-1.5 sm:p-2 rounded hover:bg-gray-700"
                >
                    <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                    onClick={addLink}
                    className={`p-1.5 sm:p-2 rounded ${editor?.isActive('link') ? 'bg-gray-700' : ''}`}
                >
                    <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className={`p-1.5 sm:p-2 rounded hover:bg-gray-700`}
                >
                    <SmileIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                    onClick={addButton}
                    className="p-1.5 sm:p-2 rounded hover:bg-gray-700"
                    title="Als Button formatieren"
                >
                    <Square className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

            {showEmojiPicker && (
                <div className="absolute z-10 mt-2 max-w-[90vw] sm:max-w-none">
                    <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        autoFocusSearch={false}
                        width={window.innerWidth < 640 ? '300px' : '350px'}
                    />
                </div>
            )}

            {showImageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg w-full max-w-[90vw] sm:max-w-md">
                        <h3 className="text-white text-lg mb-4">Bild einfügen</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-white mb-2">Bild hochladen</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="w-full text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">oder Bild-URL einfügen</label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://beispiel.de/bild.jpg"
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowImageModal(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                >
                                    Abbrechen
                                </button>
                                <button
                                    onClick={handleImageUrl}
                                    disabled={!imageUrl.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    URL einfügen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showLinkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg w-full max-w-[90vw] sm:max-w-md">
                        <h3 className="text-white text-lg mb-4">Link einfügen</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-white mb-2">URL</label>
                                <input
                                    type="url"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://beispiel.de"
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowLinkModal(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                >
                                    Abbrechen
                                </button>
                                <button
                                    onClick={handleLinkSubmit}
                                    disabled={!linkUrl.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Link einfügen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-[300px] overflow-y-auto overflow-x-hidden max-w-full touch-pan-y">
                <div className="w-full" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
                    <EditorContent editor={editor} />
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => onSave(editor.getHTML())}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Speichern
                </button>
            </div>
        </div>
    )
}
