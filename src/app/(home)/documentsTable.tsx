"use client";

import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon, Loader2Icon } from "lucide-react";
import DocumentMenu from "./documentMenu";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
  documents: Doc<"documents">[];
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
  isLoading: boolean;
}

const DocumentsTable = ({
  documents,
  loadMore,
  status,
  isLoading,
}: DocumentsTableProps) => {
  const router = useRouter();

  return (
    <div className="mx-auto mt-8 flex max-w-[1000px] flex-col gap-8 p-4 text-amber-100">
      <h2 className="text-2xl">Recent Documents</h2>
      {isLoading && status !== "LoadingMore" ? (
        <div className="mt-16 flex items-center justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      ) : documents.length === 0 ? (
        <div className="mx-auto mt-16 flex flex-col items-center">
          <p>No text documents yet</p>
          <p>Select a blank document above to get started</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Shared</TableHead>
              <TableHead className="hidden md:table-header-group">
                Created at
              </TableHead>
              <TableHead>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow
                key={document._id}
                onClick={() => {
                  router.push(`/documents/${document._id}`);
                }}
                className="cursor-pointer"
              >
                <TableCell>
                  <div className="flex items-center gap-2 lg:gap-4">
                    <SiGoogledocs className="size-4" />
                    <p>{document.title}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 lg:gap-4">
                    {document.organizationId ? (
                      <Building2Icon className="size-4" />
                    ) : (
                      <CircleUserIcon className="size-4" />
                    )}
                    {document.organizationId ? "Organization" : "Personal"}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(document._creationTime), "Pp")}
                </TableCell>
                <TableCell className="flex justify-end">
                  <DocumentMenu document={document} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {status === "CanLoadMore" && (
        <div className="my-4 flex w-full items-center justify-center">
          <Button variant="ghost" onClick={() => loadMore(5)}>
            Load more
          </Button>
        </div>
      )}
      {status === "LoadingMore" && (
        <div className="my-4 flex w-full items-center justify-center">
          <Loader2Icon className="size-4 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default DocumentsTable;
