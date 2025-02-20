"use client";

import React, { useState } from "react";
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
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteDialogProps {
  children: React.ReactNode;
  documentId: Id<"documents">;
}

const DeleteDialog = ({ children, documentId }: DeleteDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const deleteDocument = useMutation(api.documents.deleteDocument);

  const handleDocumentDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      e.stopPropagation();
      setIsDeleting(true);
      await deleteDocument({ id: documentId });
      toast.success("Document successfully deleted");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the document");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full cursor-default">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
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
  );
};

export default DeleteDialog;
