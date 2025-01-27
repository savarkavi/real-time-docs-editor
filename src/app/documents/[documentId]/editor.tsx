"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right:56px;",
        class:
          "focus:outline-none bg-white border border-[#c7c7c7] w-[800px] h-full bg-white py-10",
      },
    },
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="flex min-h-screen justify-center p-4">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
