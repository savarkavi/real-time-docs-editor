"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor";
import { Highlighter, Undo2 } from "lucide-react";
import { ColorResult, SketchPicker } from "react-color";

const TextHighlightButton = () => {
  const { editor } = useEditorStore();

  const onHighlight = (color: ColorResult) => {
    editor?.commands.toggleHighlight({ color: color.hex });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "rounded-md p-2 hover:bg-amber-200",
            editor?.isActive("highlight") && "bg-amber-200",
          )}
        >
          <Highlighter className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-amber-200 p-2">
        <SketchPicker
          color={editor?.getAttributes("highlight").color || "#ffffff"}
          onChange={onHighlight}
          className="text-black"
        />
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-md bg-amber-200 outline-none focus:bg-amber-200 focus:text-black dark:hover:bg-amber-300 dark:hover:text-black"
        >
          <button
            className="flex p-2 font-serif text-sm text-black"
            onClick={() => editor?.commands.unsetHighlight()}
          >
            <Undo2 className="size-4" />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TextHighlightButton;
