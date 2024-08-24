import {ImageResize} from "./ImageResize"
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextStyle from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";
import {Blockquote} from "@tiptap/extension-blockquote";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import {Heading} from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlock from '@tiptap/extension-code-block'
import HorizontalRule from '@tiptap/extension-horizontal-rule'


import Gapcursor from '@tiptap/extension-gapcursor'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

// // ProseMirror Plugin 생성
// const imageClickPlugin = new Plugin({
//     key: new PluginKey('image-click'),
//     props: {
//         handleDOMEvents: {
//             click: (view, event) => {
//                 console.log('click')
//                 const { state, dispatch } = view;
//                 const { tr } = state;
//                 const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
//
//                 if (pos) {
//                     const node = state.doc.nodeAt(pos.pos); // node를 가져옴
//                     console.log('node >>>',node)
//                     // node가 null이 아닌지 확인 후 접근
//                     if (node && node.type.name === 'image') {
//                         const trWithSelection = tr.setSelection(NodeSelection.create(state.doc, pos.pos));
//                         dispatch(trWithSelection);
//                         console.log('이미지 선택됨:', node.attrs.src); // 이미지 선택됨을 확인
//                         return true;
//                     }
//                 }
//                 return false;
//             },
//         },
//     },
// });
//
// // Tiptap Extension으로 변환
// const ImageClickExtension = Extension.create({
//     name: 'image-click',
//     addProseMirrorPlugins() {
//         console.log('zzz')
//         return [imageClickPlugin];
//     },
// });

CodeBlock.configure({
    exitOnArrowDown: true
})

const extensions = [
    Document,
    Paragraph,
    Text,
    StarterKit,
    Bold,
    Italic,
    Underline,
    Strike,
    BulletList,
    ListItem,
    OrderedList,
    TextStyle, // 색상
    Color, // 색상,
    Blockquote,
    Image,
    Dropcursor,
    ImageResize,
    CodeBlock, // 확장?
    HorizontalRule,
    // Gapcursor,
    // Table.configure({
    //     resizable: true,
    // }),
    // TableRow,
    // TableHeader,
    // TableCell,
    Heading.configure({
        levels: [1, 2, 3, 4, 5, 6], // 지원할 헤딩 레벨
    }),
    Placeholder.configure({
        placeholder: '내용을 입력해주세요.',
    }),
    // ImageClickExtension,  // 추가된 확장
];

export default extensions;