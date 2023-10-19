"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import SearchParams from "../Common/SearchParams";
import { Label } from "../ui/label";
import CompanyFilter from "../Company/CompanyFilter";
import RenderCompany from "../Company/RenderCompany";
const CompanyContainer = ({ companies }) => {
  const [originalData, setOriginalData] = useState(companies);
  const [data, setData] = useState(originalData);
  const [sortOrder, setSortOrder] = useState(""); // Default sorting order is newest
  const [showClearFilter, setShowClearFilter] = useState();
  useEffect(() => {
    setData(companies);
  }, [companies]);

  const filterJobs = () => {
    let filteredData = [...originalData]; // Create a copy of the original data to avoid mutating it
    useEffect(() => {
      setData(companies);
    }, [companies]);

    // Apply sorting
    if (sortOrder === "newest") {
      filteredData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOrder === "oldest") {
      filteredData.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    setData(filteredData);
  };

  const clearFilter = () => {
    setSortOrder(""); // Reset sorting order
    setShowClearFilter(false);
    setData(originalData); // Reset the data to the original unfiltered data
  };

  return (
    <div id="companyContainer" className="container">
      <SearchParams
        candidate={"company"}
        placeholder={"Search for available company"}
      />

      <div className="flex gap-4 py-10 ">
        <div className="max-lg:hidden">
          <CompanyFilter />
        </div>

        <div className="w-full">
          <div className="flex justify-between flex-wrap items-center">
            <Label>
              Showing <span className="text-primary">4</span> Results
            </Label>
            <div className="flex items-center gap-3 max-sm:flex-wrap">
              <Button
                onClick={clearFilter}
                variant="destructive"
                className="w-full py-6 marker"
              >
                Clear Filter
              </Button>

              <Select
                onValueChange={(e) => handleSortChange(e)}
                className="text-dark"
              >
                <SelectTrigger className="text-dark w-full py-6">
                  <SelectValue
                    className="text-dark"
                    placeholder="Sort By (default)"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Sort By (default)</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* clear filter */}
          {showClearFilter && (
            <div className="mt-28 ml-5 text-center flex flex-col max-w-md justify-center items-center">
              <h3 className=" max-w-md text-cente items-center  text-base font-medium leading-relaxed text-body-color">
                Oops it seems like there is not data avelable for this filter
                please clear the filter to display the rest of your data{" "}
              </h3>
              <Button
                onClick={clearFilter}
                variant="destructive"
                className=" py-6 marker mt-5"
              >
                Clear Filter
              </Button>
            </div>
          )}
          <div className="grid grid-cols-3 gap-3  max-sm:grid-cols-1  max-xl:grid-cols-2">
            {data.map((job) => {
              return (
                <RenderCompany key={job._id} data={job} setdata={setData} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyContainer;
