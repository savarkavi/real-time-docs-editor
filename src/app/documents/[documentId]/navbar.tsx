"use client";

import Image from "next/image";
import Link from "next/link";
import { BsCloudCheck } from "react-icons/bs";

import NavbarMenu from "./navbarMenu";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Inbox from "./inbox";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { Loader2 } from "lucide-react";

const Navbar = ({ document }: { document: Doc<"documents"> }) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <div className="relative h-12 w-16">
            <Image src="/logo.svg" alt="logo" fill className="object-contain" />
          </div>
        </Link>
        <div className="flex flex-col gap-2">
          <div className="ml-2 flex items-center gap-2 text-amber-100">
            <span>
              {document?.title ? (
                document.title
              ) : (
                <Loader2 className="size-4 animate-spin text-amber-100" />
              )}
            </span>
            <BsCloudCheck />
          </div>
          <NavbarMenu doc={document} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Inbox />
        <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
};

export default Navbar;
