import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useState } from 'react'
import {
    BoldIcon,
    ItalicIcon,
    ListIcon,
    Heading1Icon,
    Heading2Icon,
    ImageIcon,
    LinkIcon,
} from 'lucide-react'

interface RichTextEditorProps {
    initialContent: string
    onSave: (content: string) => void
}

export default function RichTextEditor({ initialContent, onSave }: RichTextEditorProps) {
    const [imageUrl, setImageUrl] = useState('')

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'prose prose-lg prose-invert max-w-none focus:outline-none',
            },
        },
    })

    const addImage = () => {
        const url = window.prompt('Enter image URL')
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run()
        }
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
                    onClick={() => {
                        const url = window.prompt('Enter URL')
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run()
                        }
                    }}
                    className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-700' : ''}`}
                >
                    <LinkIcon className="w-5 h-5" />
                </button>
            </div>
            <EditorContent editor={editor} />
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
