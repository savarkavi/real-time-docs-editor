"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useEditorStore } from "@/store/use-editor";
import { type Level } from "@tiptap/extension-heading";

const HeadingsButton = () => {
  const headings = [
    {
      label: "Smaller",
      value: 5,
      fontSize: "16px",
    },
    {
      label: "Small",
      value: 4,
      fontSize: "20px",
    },
    {
      label: "Medium",
      value: 3,
      fontSize: "24px",
    },
    {
      label: "Large",
      value: 2,
      fontSize: "28px",
    },
    {
      label: "Extra Large",
      value: 1,
      fontSize: "32px",
    },
  ];

  const { editor } = useEditorStore();

  const getCurrentHeading = () => {
    for (let i = 1; i <= 5; i++) {
      if (editor?.isActive("heading", { level: i })) {
        return headings[headings.length - i].label;
      }
    }
    return "Smaller";
  };

  return (
    <div>
      <Select
        onValueChange={(value) => {
          editor?.commands.setHeading({
            level: Number(value) as unknown as Level,
          });
        }}
      >
        <SelectTrigger className="w-24 gap-1 border-none hover:bg-amber-200">
          <span>{getCurrentHeading()}</span>
        </SelectTrigger>
        <SelectContent className="text-black">
          {headings.map((heading) => (
            <SelectItem
              key={heading.value}
              value={heading.value.toString()}
              style={{ fontSize: heading.fontSize }}
              className="h-fit leading-none"
            >
              {heading.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeadingsButton;
