import Navbar from "./navbar";
import TemplateGallery from "./templateGallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <TemplateGallery />
    </div>
  );
}
