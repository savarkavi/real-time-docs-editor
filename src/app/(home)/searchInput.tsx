"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useQueryState, parseAsString } from "nuqs";
import { FormEvent, useRef, useState } from "react";

interface SearchInputProps {
  classNames?: string;
  onSheetClose?: () => void;
}

const SearchInput = ({ classNames, onSheetClose }: SearchInputProps) => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const onInputClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearch(value);
    inputRef.current?.blur();

    if (onSheetClose) {
      onSheetClose();
    }
  };

  return (
    <div className={`w-full max-w-[600px] ${classNames}`}>
      <form className="relative" onSubmit={onSubmit}>
        <Input
          ref={inputRef}
          className="rounded-xl border-muted-foreground px-12 py-5 outline-none lg:py-6"
          placeholder="search document"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-100">
          <SearchIcon className="size-5" />
        </button>
        {value && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-amber-100 hover:bg-amber-500 hover:text-black"
            onClick={onInputClear}
          >
            <XIcon className="size-5" />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
