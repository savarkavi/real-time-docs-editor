"use client";

import "./styles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import ResizeImage from "tiptap-extension-resize-image";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { useEditorStore } from "@/store/use-editor";

const Editor = () => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    onCreate: ({ editor }) => setEditor(editor),
    onDestroy: () => setEditor(null),
    onUpdate: ({ editor }) => setEditor(editor),
    onSelectionUpdate: ({ editor }) => setEditor(editor),
    onTransaction: ({ editor }) => setEditor(editor),
    onFocus: ({ editor }) => setEditor(editor),
    onBlur: ({ editor }) => setEditor(editor),
    onContentError: ({ editor }) => setEditor(editor),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right:56px;",
        class:
          "focus:outline-none bg-stone-950 text-amber-100 w-[800px] h-full py-10",
      },
    },
    extensions: [
      StarterKit,
      TaskItem.configure({ nested: true }),
      TaskList,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ResizeImage,
      Underline,
      FontFamily,
      TextStyle,
      Highlight.configure({
        multicolor: true,
      }),
      Color,
      Link.configure({
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content: `
  Hello there
  `,
  });

  return (
    <div className="flex min-h-screen justify-center p-4">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
