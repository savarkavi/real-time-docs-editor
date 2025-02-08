"use client";

import { usePaginatedQuery } from "convex/react";
import DocumentsTable from "./documentsTable";
import Navbar from "./navbar";
import TemplateGallery from "./templateGallery";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const { results, loadMore, status, isLoading } = usePaginatedQuery(
    api.documents.get,
    {},
    { initialNumItems: 5 },
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <TemplateGallery />
      <DocumentsTable
        documents={results}
        loadMore={loadMore}
        status={status}
        isLoading={isLoading}
      />
    </div>
  );
}
