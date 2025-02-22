"use client";

import "./styles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import {
  useLiveblocksExtension,
  FloatingToolbar,
} from "@liveblocks/react-tiptap";
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
import TextAlign from "@tiptap/extension-text-align";

import { FontSize } from "@/extensions/font-size";

import { useEditorStore } from "@/store/use-editor";
import Ruler from "./ruler";
import { Threads } from "./threads";
import { useStorage } from "@liveblocks/react";
import { useMediaQuery } from "usehooks-ts";

const Editor = () => {
  const smallScreen = useMediaQuery("(max-width: 1024px)");

  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const { setEditor } = useEditorStore();
  const liveblocks = useLiveblocksExtension();

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
        style: `padding-left: ${smallScreen ? 16 : leftMargin}px; padding-right: ${smallScreen ? 16 : rightMargin}px;`,
        class:
          "focus:outline-none bg-stone-950 text-amber-100 w-full max-w-[1000px] mx-auto py-10 border min-h-screen",
      },
    },
    extensions: [
      liveblocks,
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
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontSize,
    ],
    content: `
  Hello there
  `,
  });

  return (
    <div className="flex min-h-screen flex-col gap-8 p-4">
      <Ruler />
      <EditorContent editor={editor} />
      <Threads editor={editor} />
    </div>
  );
};

export default Editor;
