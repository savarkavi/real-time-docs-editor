import Editor from "./editor";

interface DocumentIdPageParams {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageParams) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#f9fbfd]">
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
