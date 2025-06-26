// SimpleEditor.jsx
import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";

// 필요한 확장 및 컴포넌트는 주석 처리 또는 대체 필요
// import Link from "./components/link-extension";
// import Selection from "./components/selection-extension";
// import TrailingNode from "./components/trailing-node-extension";
// import ImageUploadNode from "./components/image-upload-node";

// 게시글 작성은 텍스트 블럭과 이미지 블럭으로 나누어서 
// 추가한 순서대로 순차로 저장되는 방식.
// 예시 : 노션

// import Toolbar 등 커스텀 UI도 아래와 같이 기본 대체 가능
const Toolbar = ({ children }) => <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '10px', borderBottom: '1px solid #ddd' }}>{children}</div>;
const Button = ({ onClick, children }) => <button onClick={onClick} style={{ padding: '4px 8px' }}>{children}</button>;

// 초기 콘텐츠 (JSON 형태 그대로 넣음)
// import content from "./content.json";

const TextInputBlock = ({ id, onChange }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      // Selection,
      // ImageUploadNode,
      // TrailingNode,
      // Link.configure({ openOnClick: false }),
    ],
  });

  useEffect(() => {
    if (editor && onChange) {
      const update = () => onChange(editor.getHTML());
      editor.on('update', update);
      return () => editor.off('update', update);
    }
  }, [editor]);

  if (!editor) return null;

  const save = () => {
    console.log(editor.getHTML());
  }

  return (
    <EditorContext.Provider value={{ editor }} id={id}>
      <div style={{ border: '1px solid #ccc', borderRadius: '6px', margin: '2rem auto' }}>
        <Toolbar>
          <Button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</Button>
          <Button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</Button>
          <Button onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</Button>
          <Button onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</Button>
          <Button onClick={() => editor.chain().focus().toggleHighlight().run()}>Highlight</Button>
          <Button onClick={() => editor.chain().focus().toggleSubscript().run()}>Subscript</Button>
          <Button onClick={() => editor.chain().focus().toggleSuperscript().run()}>Superscript</Button>
          <Button onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</Button>
          <Button onClick={() => editor.chain().focus().toggleOrderedList().run()}>Ordered List</Button>
          <Button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code Block</Button>
        </Toolbar>
        <EditorContent 
          editor={editor} 
          style={{ padding: '1rem' }} 
          role="presentation"
        />
      </div>
      {/* <button onClick={save}>작성</button> */}
    </EditorContext.Provider>
  );
};

export default TextInputBlock;
