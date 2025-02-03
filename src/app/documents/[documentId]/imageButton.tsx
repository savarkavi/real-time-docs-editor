"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ImagesIcon, SearchIcon, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEditorStore } from "@/store/use-editor";

const ImageButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [value, setValue] = useState("");

  const { editor } = useEditorStore();

  const onSubmit = () => {
    editor?.commands.setImage({ src: value });
    setValue("");
    setIsDialogOpen(false);
  };

  const onUpload = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        editor?.commands.setImage({ src: imageUrl });
      }
    };

    input.click();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-md p-2 hover:bg-amber-200">
            <ImagesIcon className="size-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-black">
          <DropdownMenuItem className="cursor-pointer" onClick={onUpload}>
            <div className="flex items-center gap-3">
              <UploadIcon className="size-4" />
              <span>Upload</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="flex items-center gap-3">
              <SearchIcon className="size-4" />
              <span>Enter Image Url</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Past Image URL</DialogTitle>
          </DialogHeader>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <DialogFooter>
            <Button
              disabled={!value}
              className="bg-amber-500"
              onClick={onSubmit}
            >
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageButton;
