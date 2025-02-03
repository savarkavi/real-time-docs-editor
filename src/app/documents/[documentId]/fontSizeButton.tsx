"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditorStore } from "@/store/use-editor";

const FontSizeButton = () => {
  const sizes = [
    {
      size: "12",
      value: "12px",
    },
    {
      size: "16",
      value: "16px",
    },
    {
      size: "20",
      value: "20px",
    },
    {
      size: "24",
      value: "24px",
    },
    {
      size: "28",
      value: "28px",
    },
    {
      size: "32",
      value: "32px",
    },
    {
      size: "36",
      value: "36px",
    },
    {
      size: "40",
      value: "40px",
    },
    {
      size: "44",
      value: "44px",
    },
    {
      size: "48",
      value: "48px",
    },
    {
      size: "52",
      value: "52px",
    },
    {
      size: "56",
      value: "56px",
    },
    {
      size: "60",
      value: "60px",
    },
  ];

  const { editor } = useEditorStore();

  return (
    <div>
      <Select
        onValueChange={(value) => {
          editor?.commands.setFontSize(value);
        }}
      >
        <SelectTrigger className="w-16 gap-1 border-none hover:bg-amber-200">
          <SelectValue placeholder="12" />
        </SelectTrigger>
        <SelectContent className="text-black">
          {sizes.map(({ size, value }) => (
            <SelectItem key={size} value={value}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontSizeButton;
