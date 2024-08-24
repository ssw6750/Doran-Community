import { useRouter } from 'next/router';
import Head from 'next/head';
import React, {FormEvent, useState, useCallback, ChangeEvent, useRef} from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import axios from "axios";
import extenstions from '../util/tiptap/extensions'


interface EditorProps {
    submitPost: (params: { e: FormEvent<HTMLFormElement>, title: string, body: string }) => void;
}

const Editor: React.FC<EditorProps> = ({submitPost}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const submit = (e: FormEvent<HTMLFormElement>) => {
        submitPost({e, title, body});
    };

    const fileInputRef = useRef<HTMLInputElement>(null)

    // Tiptap Editor 설정
    const editor = useEditor({
        extensions: extenstions,
        content: '내용을 작성해주세요.',
        onUpdate: ({ editor }) => {
            setBody(editor.getHTML());
        },
    });

    const addImage = useCallback(() => {
        if (!editor) return;

        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    const deleteSelectedImage = () => {
        if (!editor) return;
        editor.chain().focus().deleteSelection().run();
    };

    if (!editor) {
        return null;
    }

    const uploadImage = async(event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files === null) return;

        const file = event.target.files[0];

        // FormData를 사용하여 파일을 서버로 전송
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", fileInputRef.current!.name);

        try {
            const response = await axios.post("file/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // 서버에서 반환된 이미지 URL
            const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/file/${response.data.name}`;
            console.log('imageUrl >>> ', imageUrl)
            if (imageUrl) {
                // Tiptap 에디터에 이미지 추가
                editor.chain().focus().setImage({ src: imageUrl }).run();
            }
        } catch (error) {
            console.error("파일 업로드 실패:", error);
        }
    }

    const openFileInput = (type:string) => {
        const fileInput = fileInputRef.current;
        if(fileInput) {
            fileInput.name=type;
            fileInput.click()
        }
    }

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
            </Head>
            <form onSubmit={submit}>
                <div className='relative mb-2'>
                    <input
                        type='text'
                        className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500'
                        placeholder='제목'
                        maxLength={20}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div
                        style={{top: 10, right: 10}}
                        className='absolute mb-2 text-sm text-gray-400 select-none'
                    >
                        {title.trim().length}/20
                    </div>
                    {/* 상단 툴바 UI */}
                    <div className="flex space-x-0">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`${editor.isActive('bold') ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-icons text-2xl">format_bold</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`${editor.isActive('italic') ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-icons text-2xl">format_italic</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`${editor.isActive('underline') ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-icons text-2xl">format_underline</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={`${editor.isActive('strike') ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-icons text-2xl">strikethrough_s</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`${editor.isActive('listBullet') ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-icons text-2xl">list</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`${editor.isActive('numberedList') ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-icons text-2xl">format_list_numbered</span>
                        </button>
                        <input
                            type="color"
                            onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                            value={editor.getAttributes('textStyle').color}
                            data-testid="setColor"
                            className={`${editor.isActive('textStyle') ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        />
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                            className={`${editor.isActive('heading', {level: 1}) ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-symbols-outlined text-2xl">format_h1</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                            className={`${editor.isActive('heading', {level: 2}) ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-symbols-outlined text-2xl">format_h2</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                            className={`${editor.isActive('heading', {level: 3}) ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-symbols-outlined text-2xl">format_h3</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                            className={`${editor.isActive('heading', {level: 4}) ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-symbols-outlined text-2xl">format_h4</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                            className={`${editor.isActive('heading', {level: 5}) ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-symbols-outlined text-2xl">format_h5</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                            className={`${editor.isActive('heading', {level: 6}) ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-symbols-outlined text-2xl">format_h6</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={`${editor.isActive('blockquote', {level: 6}) ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-icons">format_quote</span>
                        </button>
                        <button
                            onClick={() => openFileInput("editor")}
                            className={'w-8 h-8 border border-gray-300 flex items-center justify-center'}
                        >
                            <span className="material-symbols-outlined">add_photo_alternate</span>
                        </button>
                        <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage}/>
                        <button
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={`${editor.isActive('codeBlock', {level: 6}) ? 'bg-gray-200' : ''} w-8 h-8 border border-gray-300 flex items-center justify-center`}
                        >
                            <span className="material-symbols-outlined">code_blocks</span>
                        </button>
                        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
                                className={'w-8 h-8 border border-gray-300 flex items-center justify-center'}>
                            <span className="material-symbols-outlined">horizontal_rule</span>
                        </button>
                    </div>
                    <EditorContent editor={editor}
                                   className='p-2 border min-h-[600px] focus:outline-none focus:border-transparent'/>
                    <div className='flex justify-end'>
                        <button className='px-4 py-1 text-sm font-semibold text-white bg-gray-400 border rounded'>
                            생성하기
                        </button>
                    </div>
                </div>
            </form>
            <div>
                {body}
            </div>
        </div>
    );
};

export default Editor;

