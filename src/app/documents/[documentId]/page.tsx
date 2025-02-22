import { redirect } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Editor from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import Toolbar from "./toolbar";
import { fetchQuery } from "convex/nextjs";

interface DocumentIdPageParams {
  params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageParams) => {
  const { documentId } = await params;

  const document = await fetchQuery(api.documents.getDocumentById, {
    id: documentId,
  });

  if (!document) {
    redirect("/");
  }

  return (
    <Room>
      <div className="min-h-screen w-full overflow-x-hidden bg-stone-950 text-black">
        <Navbar document={document} />
        <Toolbar />
        <Editor />
      </div>
    </Room>
  );
};

export default DocumentIdPage;
