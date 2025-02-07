import Image from "next/image";
import Link from "next/link";
import SearchInput from "./searchInput";
import { UserButton, ClerkLoading } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Link href="/">
          <div className="relative h-12 w-16">
            <Image src="/logo.svg" alt="logo" fill className="object-contain" />
          </div>
        </Link>
        <h1 className="font-serif text-2xl text-amber-100">Yuma</h1>
      </div>
      <SearchInput />
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
