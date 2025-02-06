"use client";

import { PlusIcon } from "lucide-react";

const TemplateGallery = () => {
  return (
    <div className="w-full px-4 py-8 font-serif">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-6">
        <h2 className="font-3xl text-amber-100">Start a new Document</h2>
        <div className="flex h-[250px] w-[200px] cursor-pointer items-center justify-center rounded-lg border border-muted-foreground bg-stone-950 p-4">
          <PlusIcon className="size-16 text-amber-500" />
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;
