"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditorStore } from "@/store/use-editor";

const FontFamilyButton = () => {
  const fonts = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
    {
      label: "Trebuchet MS",
      value: "Trebuchet MS",
    },
    {
      label: "Comic Sans MS",
      value: "Comic Sans MS",
    },
    {
      label: "Impact",
      value: "Impact",
    },
    {
      label: "Lucida Sans Unicode",
      value: "Lucida Sans Unicode",
    },
    {
      label: "Tahoma",
      value: "Tahoma",
    },
    {
      label: "Palatino Linotype",
      value: "Palatino Linotype",
    },
  ];

  const { editor } = useEditorStore();

  return (
    <div>
      <Select onValueChange={(value) => editor?.commands.setFontFamily(value)}>
        <SelectTrigger className="w-24 gap-1 border-none hover:bg-amber-200">
          <span>
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
        </SelectTrigger>
        <SelectContent className="text-black">
          {fonts.map((font) => (
            <SelectItem
              key={font.value}
              value={font.value}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontFamilyButton;
