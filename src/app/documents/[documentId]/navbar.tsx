import Image from "next/image";
import Link from "next/link";
import { BsCloudCheck } from "react-icons/bs";

import NavbarMenu from "./navbarMenu";

const Navbar = () => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <div className="relative h-12 w-16">
            <Image src="/logo.svg" alt="logo" fill className="object-contain" />
          </div>
        </Link>
        <div className="flex flex-col gap-2">
          <div className="ml-2 flex items-center gap-2 text-amber-100">
            <span>Untitled document</span>
            <BsCloudCheck />
          </div>
          <NavbarMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
