"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchParams = ({ placeholder, candidate }) => {
  //Initialize React Hook Form with schema and default values
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [query] = useDebounce(search, 500);

  useEffect(() => {
    if (query === "") {
      candidate === true
        ? router.push(`/jobs`)
        : candidate === "company"
        ? router.push(`/company`)
        : router.push(`/candidate`);
    } else {
      candidate === true
        ? router.push(`/jobs?search=${query}`)
        : candidate === "company"
        ? router.push(`/company?search=${query}`)
        : router.push(`/Employears?search=${query}`);
    }
  }, [query, router, candidate]);

  return (
    <div className="flex items-center gap-4 ">
      <div className="flex items-center gap-2 w-full">
        <Search className="text-gray-500" />{" "}
        <Input
          onChange={(event) => setSearch(event.target.value)}
          className="p-7 text-dark"
          type="text"
          placeholder={placeholder}
        />
      </div>

      <Button className="p-7 bg-primary">Search</Button>
    </div>
  );
};

export default SearchParams;
