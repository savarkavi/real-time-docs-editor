import Editor from "./editor";
import Toolbar from "./toolbar";

interface DocumentIdPageParams {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageParams) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-stone-950 text-black">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
