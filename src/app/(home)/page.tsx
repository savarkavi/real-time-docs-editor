"use client";

import { usePaginatedQuery } from "convex/react";
import DocumentsTable from "./documentsTable";
import Navbar from "./navbar";
import TemplateGallery from "./templateGallery";
import { api } from "../../../convex/_generated/api";
import { parseAsString, useQueryState } from "nuqs";

export default function Home() {
  const [search] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );

  const { results, loadMore, status, isLoading } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 },
  );

  return (
    <div className="min-h-screen bg-black pb-10">
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
