import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustifyIcon, Building2Icon, User2Icon } from "lucide-react";
import SearchInput from "./searchInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

const MenuSheet = () => {
  const [open, setOpen] = useState(false);

  const onSheetClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <AlignJustifyIcon className="text-amber-500" />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col justify-between py-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <SheetTitle className="hidden">Sidebar Menu</SheetTitle>
          <SearchInput onSheetClose={onSheetClose} />
          <div className="mt-16 flex flex-col gap-4">
            <Link
              href="/user-profile"
              className="flex w-full items-center gap-2 rounded-lg p-2 font-serif text-lg text-amber-100"
            >
              <User2Icon className="size-6" />
              Profile settings
            </Link>
            <Link
              href="/organization-profile"
              className="flex w-full items-center gap-2 rounded-lg p-2 font-serif text-lg text-amber-100"
            >
              <Building2Icon className="size-6" />
              Organization settings
            </Link>
          </div>
        </div>
        <Button asChild className="w-fit">
          <SignOutButton />
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
