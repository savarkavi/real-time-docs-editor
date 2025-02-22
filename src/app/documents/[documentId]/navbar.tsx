"use client";

import Image from "next/image";
import Link from "next/link";
import { BsCloudCheck } from "react-icons/bs";

import NavbarMenu from "./navbarMenu";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Inbox from "./inbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Loader2 } from "lucide-react";

const Navbar = ({ document }: { document: Doc<"documents"> }) => {
  return (
    <div className="flex flex-col gap-6 p-4 lg:gap-3 print:hidden">
      <div className="flex w-full justify-between">
        <div className="flex gap-4">
          <Link href="/">
            <div className="relative h-10 w-14 lg:h-12 lg:w-16">
              <Image
                src="/logo.svg"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <div className="flex items-center gap-2 text-amber-100">
            <span>
              {document?.title ? (
                document.title
              ) : (
                <Loader2 className="size-4 animate-spin text-amber-100" />
              )}
            </span>
            <BsCloudCheck />
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
                  organizationPreviewAvatarBox: "lg:w-8 lg:h-8",
                  userPreviewAvatarBox: "lg:w-8 lg:h-8",
                },
              }}
            />
            <div className="hidden lg:block">
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
      </div>
      <NavbarMenu doc={document} />
    </div>
  );
};

export default Navbar;
