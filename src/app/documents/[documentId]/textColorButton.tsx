"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor";
import { Palette } from "lucide-react";
import { ColorResult, SketchPicker } from "react-color";

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const onColorChange = (color: ColorResult) => {
    editor?.commands.setColor(color.hex);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-2 hover:bg-amber-200">
          <Palette className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SketchPicker
          color={editor?.getAttributes("textStyle").color || "#000000"}
          onChange={onColorChange}
          className="z-[99]"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TextColorButton;
