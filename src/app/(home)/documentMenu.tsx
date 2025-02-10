"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ExternalLinkIcon,
  FilePenIcon,
  Loader2Icon,
  MoreVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DocumentMenuProps {
  documentId: Id<"documents">;
}

const DocumentMenu = ({ documentId }: DocumentMenuProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteDocument = useMutation(api.documents.deleteDocument);
  const updateDocument = useMutation(api.documents.updateDocument);

  const handleOpenInNewTab = () => {
    window.open(`/documents/${documentId}`, "_blank");
  };

  const handleDocumentDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      e.stopPropagation();
      setIsDeleting(true);
      await deleteDocument({ id: documentId });
      toast.success("Document successfully deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the document");
    } finally {
      setIsDeleting(false);
    }
  };

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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <button onClick={(e) => e.stopPropagation()}>
            <MoreVerticalIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="text-black"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogTrigger
            asChild
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <button className="flex w-full items-center gap-2">
                <FilePenIcon className="size-4" />
                Rename
              </button>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex w-full items-center gap-2">
                  <Trash2Icon className="size-4" />
                  Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your document.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleting}
                    onClick={handleDocumentDelete}
                    className="flex w-20 items-center justify-center bg-red-500 text-white hover:bg-red-400"
                  >
                    {isDeleting ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                      <span>Delete</span>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenInNewTab}>
            <ExternalLinkIcon />
            Open in new tab
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent onClick={(e) => e.stopPropagation()}>
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

export default DocumentMenu;
