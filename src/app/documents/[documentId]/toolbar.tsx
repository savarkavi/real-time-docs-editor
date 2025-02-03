"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import FontFamilyButton from "./fontFamilyButton";
import HeadingsButton from "./headingsButton";
import TextColorButton from "./textColorButton";
import TextHighlightButton from "./textHighlightButton";
import LinkButton from "./linkButton";
import ImageButton from "./imageButton";
import TextAlignmentButton from "./textAlignmentButton";
import ListButton from "./listButton";
import FontSizeButton from "./fontSizeButton";

interface ToolbarButtonProps {
  icon: LucideIcon;
  isActive?: boolean;
  onClick: () => void;
}

const ToolbarButton = ({
  icon: Icon,
  isActive,
  onClick,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-md p-2 hover:bg-amber-200",
        isActive && "bg-amber-200",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections = [
    [
      {
        label: "undo",
        icon: Undo2Icon,
        onClick: () => editor?.commands.undo(),
      },
      {
        label: "redo",
        icon: Redo2Icon,
        onClick: () => editor?.commands.redo(),
      },
      {
        label: "print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
    ],
    [
      {
        label: "bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.commands.toggleBold(),
      },
      {
        label: "italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.commands.toggleItalic(),
      },
      {
        label: "underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.commands.toggleUnderline(),
      },
      {
        label: "strikethrough",
        icon: StrikethroughIcon,
        isActive: editor?.isActive("strike"),
        onClick: () => editor?.commands.toggleStrike(),
      },
    ],
    [
      {
        label: "comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("comment"),
      },
      {
        label: "list todo",
        icon: ListTodoIcon,
        onClick: () => editor?.commands.toggleTaskList(),
      },
      {
        label: "remove formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.commands.unsetAllMarks(),
      },
    ],
  ];

  return (
    <div className="flex h-12 items-center gap-x-2 bg-amber-500 px-6 py-2">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-full bg-amber-200" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-full bg-amber-200" />
      <HeadingsButton />
      <Separator orientation="vertical" className="h-full bg-amber-200" />
      <FontSizeButton />
      <Separator orientation="vertical" className="h-full bg-amber-200" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <TextHighlightButton />
      <Separator orientation="vertical" className="h-full bg-amber-200" />
      <LinkButton />
      <ImageButton />
      <TextAlignmentButton />
      <ListButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
