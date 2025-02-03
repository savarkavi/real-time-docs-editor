"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor";
import { ListIcon, ListOrderedIcon } from "lucide-react";

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      value: "bulletList",
      onClick: () => editor?.commands.toggleBulletList(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      value: "orderedList",
      onClick: () => editor?.commands.toggleOrderedList(),
    },
  ];

  const getListButton = () => {
    const list = lists.find((item) => editor?.isActive(item.value));

    if (list) {
      const Icon = list.icon;
      return <Icon className="size-5" />;
    }

    return <ListIcon className="size-5" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-2 hover:bg-amber-200">
          {getListButton()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-2 text-black">
        {lists.map(({ label, value, icon: Icon, onClick }) => (
          <DropdownMenuItem
            key={label}
            className={cn(
              "flex items-center gap-3",
              editor?.isActive(value) && "bg-stone-800 text-white",
            )}
            onClick={onClick}
          >
            <Icon className="size-4" />
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListButton;
