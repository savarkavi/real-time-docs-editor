"use client";

import { useEditorStore } from "@/store/use-editor";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  AlignLeft,
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileText,
  Globe,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import { AiOutlineFilePdf } from "react-icons/ai";

const NavbarMenu = () => {
  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor?.commands.insertTable({ rows, cols, withHeaderRow: false });
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();

    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });

    onDownload(blob, "document.json");
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();

    const blob = new Blob([content], {
      type: "text/html",
    });

    onDownload(blob, "document.html");
  };

  const onSaveDocument = () => {
    if (!editor) return;

    const content = editor.getText();

    const blob = new Blob([content], {
      type: "text/plain",
    });

    onDownload(blob, "document.txt");
  };

  return (
    <Menubar className="border-none p-0 text-amber-100">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent className="bg-stone-900 print:hidden">
          <MenubarSub>
            <MenubarSubTrigger>
              <FileIcon className="mr-2 size-4" />
              Save
            </MenubarSubTrigger>
            <MenubarSubContent className="bg-stone-900">
              <MenubarItem className="flex gap-2" onClick={onSaveJSON}>
                <FileJsonIcon className="size-4" />
                JSON
              </MenubarItem>
              <MenubarItem className="flex gap-2" onClick={onSaveHTML}>
                <Globe className="size-4" />
                HTML
              </MenubarItem>
              <MenubarItem
                className="flex gap-2"
                onClick={() => window.print()}
              >
                <AiOutlineFilePdf className="size-4" />
                PDF
              </MenubarItem>
              <MenubarItem className="flex gap-2" onClick={onSaveDocument}>
                <FileText className="size-4" />
                Document
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem className="flex gap-2">
            <FilePlusIcon className="size-4" />
            New Document
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-2">
            <FilePenIcon className="size-4" />
            Rename
          </MenubarItem>
          <MenubarItem className="flex gap-2">
            <TrashIcon className="size-4" />
            Remove
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-2">
            <PrinterIcon className="size-4" />
            Print <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent className="bg-stone-900">
          <MenubarItem
            className="flex gap-2"
            onClick={() => editor?.commands.undo()}
          >
            <Undo2Icon className="size-4" />
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            className="flex gap-2"
            onClick={() => editor?.commands.redo()}
          >
            <Redo2Icon className="size-4" />
            Redo <MenubarShortcut>⌘Y</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Insert</MenubarTrigger>
        <MenubarContent className="bg-stone-900">
          <MenubarSub>
            <MenubarSubTrigger>Table</MenubarSubTrigger>
            <MenubarSubContent className="bg-stone-900">
              <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                1 x 1
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                2 x 2
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                3 x 3
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                4 x 4
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 5, cols: 5 })}>
                5 x 5
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 6, cols: 6 })}>
                6 x 6
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent className="bg-stone-900">
          <MenubarSub>
            <MenubarSubTrigger>
              <AlignLeft className="mr-2 size-4" />
              Text
            </MenubarSubTrigger>
            <MenubarSubContent className="bg-stone-900">
              <MenubarItem onClick={() => editor?.commands.toggleBold()}>
                <BoldIcon className="mr-2 size-4" />
                Bold <MenubarShortcut>⌘B</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => editor?.commands.toggleItalic()}>
                <ItalicIcon className="mr-2 size-4" />
                Italic <MenubarShortcut>⌘I</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => editor?.commands.toggleUnderline()}>
                <UnderlineIcon className="mr-2 size-4" />
                Underline <MenubarShortcut>⌘U</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => editor?.commands.toggleStrike()}>
                <StrikethroughIcon className="mr-2 size-4" />
                Strikethrough
                <MenubarShortcut className="ml-8">⌘⇧S</MenubarShortcut>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem onClick={() => editor?.commands.unsetAllMarks()}>
            <RemoveFormattingIcon className="mr-2 size-4" />
            Clear Formatting
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavbarMenu;
