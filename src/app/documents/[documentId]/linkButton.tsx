"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEditorStore } from "@/store/use-editor";
import { LinkIcon } from "lucide-react";
import { useState } from "react";

const LinkButton = () => {
  const { editor } = useEditorStore();

  const [value, setValue] = useState(editor?.getAttributes("link").href || "");

  const onSetLink = (url: string) => {
    editor?.commands.setLink({ href: url });
    setValue("");
  };

  return (
    <Popover
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <PopoverTrigger asChild>
        <button className="rounded-md p-2 hover:bg-amber-200">
          <LinkIcon className="size-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex gap-3 text-black">
          <div className="relative">
            <LinkIcon className="absolute left-2 top-1/2 size-4 -translate-y-1/2" />
            <Input
              placeholder="https://example.com"
              className="min-w-[200px] pl-8 placeholder:text-gray-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          {!value ? (
            <Button
              disabled={!value}
              className="w-fit bg-amber-500 text-sm"
              onClick={() => onSetLink(value)}
            >
              Set Link
            </Button>
          ) : (
            <Button
              className="w-fit bg-amber-500 text-sm"
              onClick={() => {
                editor?.commands.unsetLink();
                setValue("");
              }}
            >
              Unset Link
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LinkButton;
