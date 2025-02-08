"use client";

import { useMutation } from "convex/react";
import { PlusIcon } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TemplateGallery = () => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const create = useMutation(api.documents.create);

  const onDocumentClick = async () => {
    try {
      setIsCreating(true);
      const documentId = await create({});
      router.push(`/documents/${documentId}`);
      toast.success("New document created");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create a document. Try again later");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full px-4 py-8 font-serif">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-6">
        <h2 className="text-2xl text-amber-100">Start a new Document</h2>
        <button
          disabled={isCreating}
          className="w-fit cursor-pointer disabled:cursor-not-allowed"
        >
          <div
            className="flex h-[200px] w-[150px] items-center justify-center rounded-lg border border-muted-foreground bg-stone-950 p-4 hover:border-amber-500"
            onClick={onDocumentClick}
          >
            <PlusIcon className="size-16 text-amber-500" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TemplateGallery;
