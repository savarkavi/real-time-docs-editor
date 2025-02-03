"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor";

import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

const TextAlignmentButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      icon: AlignLeft,
      value: "left",
    },
    {
      label: "Align Center",
      icon: AlignCenter,
      value: "center",
    },
    {
      label: "Align Right",
      icon: AlignRight,
      value: "right",
    },
    {
      label: "Align Justify",
      icon: AlignJustify,
      value: "justify",
    },
  ];

  const getAlignButton = () => {
    const align = alignments.find((item) =>
      editor?.isActive({ textAlign: item.value }),
    );

    if (align) {
      const Icon = align.icon;
      return <Icon className="size-5" />;
    }

    return <AlignLeft className="size-5" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-2 hover:bg-amber-200">
          {getAlignButton()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-2 text-black">
        {alignments.map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem
            key={label}
            className={cn(
              "flex items-center gap-3",
              editor?.isActive({ textAlign: value }) &&
                "bg-stone-800 text-white",
            )}
            onClick={() => editor?.commands.setTextAlign(value)}
          >
            <Icon className="size-4" />
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TextAlignmentButton;
