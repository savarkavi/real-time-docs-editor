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
import { Doc } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import DeleteDialog from "@/components/deleteDialog";

interface DocumentMenuProps {
  document: Doc<"documents">;
}

const DocumentMenu = ({ document }: DocumentMenuProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { userId } = useAuth();

  const isOwner = userId === document.ownerId;

  const updateDocument = useMutation(api.documents.updateDocument);

  const handleOpenInNewTab = () => {
    window.open(`/documents/${document._id}`, "_blank");
  };

  const handleDocumentUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Invalid title");
      return;
    }

    try {
      setIsUpdating(true);
      await updateDocument({ id: document._id, title: title.trim() });
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
          {isOwner && (
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
          )}
          {isOwner && (
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteDialog documentId={document._id}>
                <button className="flex w-full items-center gap-2">
                  <Trash2Icon className="size-4" />
                  Delete
                </button>
              </DeleteDialog>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleOpenInNewTab}>
            <ExternalLinkIcon />
            Open in new tab
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isOwner && (
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
      )}
    </Dialog>
  );
};

export default DocumentMenu;
