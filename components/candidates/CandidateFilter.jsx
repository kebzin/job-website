"use client";
import React, { useState } from "react";
import { CompanyCategory } from "../Common/constant";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "../ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown, Check } from "lucide-react";
const CandidateFilter = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="bg-primary/[10%] py-7 px-6  flex flex-col gap-5 min-w-[270px] max-lg:hidden ">
      <h1 className="text-center mb-3 text-heading3-bold">Filter</h1>

      {/* h3 */}

      <div>
        <span className=" text-gray-500 mb-3">Category</span>
        <Popover
          open={open}
          onOpenChange={setOpen}
          className="flex overflow-auto"
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className=" justify-between w-full py-7 text-black"
            >
              {value
                ? CompanyCategory.find((element) => element.name === value)
                    ?.label
                : "Select Category..."}
              <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Command>
              <CommandInput placeholder="Search element..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {CompanyCategory.map((element) => (
                  <CommandItem
                    key={element.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={` mr-2 h-4 w-4
               ${value === element.name ? "opacity-100" : `opacity-0`}`}
                    />
                    {element.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <span className=" text-gray-500 ">Gender Base </span>
        <Select
          o
          //   onValueChange={(value) => HandleFiltering(value)}
          className=""
        >
          <SelectTrigger className="text-dark w-ful py-6">
            <SelectValue className="text-dark" placeholder="Gender Base" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="All Gender">All Gender</SelectItem>
          </SelectContent>
        </Select>
        {/* <div className="flex flex-col gap-2">
      <span className=" text-gray-500 ">Urgency </span>
      <Select onValueChange={(value) => HandleUrgent(value)} className="">
        <SelectTrigger className="text-dark w-ful py-6">
          <SelectValue className="text-dark" placeholder="Job Urgency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Urgent">Urgent</SelectItem>
          <SelectItem value="Normal">Normal</SelectItem>
          <SelectItem value="All Types">All types</SelectItem>
        </SelectContent>
      </Select>
    </div>  */}
      </div>
    </div>
  );
};

export default CandidateFilter;
