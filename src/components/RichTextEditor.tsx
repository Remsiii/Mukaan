import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
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
} from 'lucide-react'

interface RichTextEditorProps {
    initialContent: string
    onSave: (content: string) => void
}

const PLACEHOLDER = {
    heading: 'Gib deinem Artikel einen Titel...',
    text: 'Schreibe hier deinen Artikel. Nutze die Toolbar um Text zu formatieren, Listen zu erstellen oder Medien einzufügen.'
}

export default function RichTextEditor({ initialContent, onSave }: RichTextEditorProps) {
    const [imageUrl, setImageUrl] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
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

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
        ],
        content: initialContent || `<h1>${PLACEHOLDER.heading}</h1><p>${PLACEHOLDER.text}</p>`,
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] prose-headings:text-white prose-p:text-white prose-strong:text-white prose-ul:text-white prose-li:text-white prose-ul:list-disc prose-ul:ml-4 prose-li:marker:text-white',
                style: 'font-size: 16px;',
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

    const onEmojiClick = (emojiObject: any) => {
        if (editor) {
            editor.chain().focus().insertContent(emojiObject.emoji).run()
        }
        setShowEmojiPicker(false)
    }

    if (!editor) return null

    return (
        <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-4">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-700' : ''}`}
                >
                    <BoldIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-700' : ''}`}
                >
                    <ItalicIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700' : ''}`}
                >
                    <Heading1Icon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700' : ''}`}
                >
                    <Heading2Icon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-700' : ''}`}
                >
                    <ListIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={addImage}
                    className="p-2 rounded hover:bg-gray-700"
                >
                    <ImageIcon className="w-5 h-5" />
                </button>

                <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className={`p-2 rounded hover:bg-gray-700`}
                >
                    <SmileIcon className="w-5 h-5" />
                </button>
            </div>

            {showEmojiPicker && (
                <div className="absolute z-10 mt-2">
                    <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        autoFocusSearch={false}
                    />
                </div>
            )}

            {showImageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-96">
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

            <div className="min-h-[300px] overflow-y-auto overflow-x-hidden max-w-full [&_ul]:list-disc [&_ul]:ml-4">
                <div className="w-full" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
                    <EditorContent editor={editor} />
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => onSave(editor.getHTML())}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Save Content
                </button>
            </div>
        </div>
    )
}
