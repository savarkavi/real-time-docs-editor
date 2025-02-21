import Image from "next/image";
import Link from "next/link";
import SearchInput from "./searchInput";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import MenuSheet from "./menuSheet";

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
      <SearchInput classNames="hidden lg:block" />
      <div className="hidden items-center gap-2 lg:flex">
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTriggerIcon: "text-muted-foreground",
              organizationPreviewMainIdentifier: "text-muted-foreground",
              organizationPreviewAvatarBox: "w-8 h-8",
              userPreviewAvatarBox: "w-8 h-8",
            },
          }}
        />
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8",
            },
          }}
        />
      </div>
      <div className="lg:hidden">
        <MenuSheet />
      </div>
    </div>
  );
};

export default Navbar;
