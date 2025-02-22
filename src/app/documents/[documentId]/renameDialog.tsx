"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface RenameDialogProps {
  children: React.ReactNode;
  documentId: Id<"documents">;
}

const RenameDialog = ({ children, documentId }: RenameDialogProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateDocument = useMutation(api.documents.updateDocument);

  const handleDocumentUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Invalid title");
      return;
    }

    try {
      setIsUpdating(true);
      await updateDocument({ id: documentId, title: title.trim() });
      toast.success("Document successfully updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update the document");
    } finally {
      setIsUpdating(false);
      setTitle("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="w-full cursor-default">
        {children}
      </DialogTrigger>
      <DialogContent>
        <form className="flex flex-col gap-4" onSubmit={handleDocumentUpdate}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <Input
            className="text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter>
            <Button disabled={isUpdating} type="submit" className="w-20">
              {isUpdating ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <span>Save</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
