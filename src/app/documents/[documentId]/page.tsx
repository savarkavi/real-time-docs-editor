import Editor from "./editor";
import Navbar from "./navbar";
import Toolbar from "./toolbar";

interface DocumentIdPageParams {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageParams) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-stone-950 text-black">
      <Navbar />
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
