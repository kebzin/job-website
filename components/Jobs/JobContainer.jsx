"use client";
import React, { useEffect, useState } from "react";
import SearchParams from "@/components/Common/SearchParams";
import JobFilter from "@/app/jobs/JobFilter";
import JobRender from "@/app/jobs/JobRender";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

const JobContainer = ({ jobs }) => {
  const [originalData, setOriginalData] = useState(jobs);
  const [data, setData] = useState(originalData);
  const [sortOrder, setSortOrder] = useState(""); // Default sorting order is newest
  const [showClearFilter, setShowClearFilter] = useState();

  const handleSortChange = (e) => {
    setSortOrder(e);
    filterJobs(); // Call the filtering function with the selected values
  };

  useEffect(() => {
    setData(jobs);
  }, [jobs]);

  const filterJobs = () => {
    let filteredData = [...originalData]; // Create a copy of the original data to avoid mutating it

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
    <div id="jobContainer" className="container">
      <SearchParams
        candidate={true}
        placeholder={"Search for available jobs"}
      />

      <div className="flex gap-4 py-10">
        <div className="max-lg:hidden">
          <JobFilter
            data={data}
            setdata={setData}
            originalData={originalData}
            setShowClearFilter={setShowClearFilter}
          />
        </div>

        <div>
          <div className="flex justify-between flex-wrap items-center">
            <Label>
              Showing <span className="text-primary">{data?.length}</span>{" "}
              Results
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

          {data.map((job) => {
            return <JobRender key={job.id} data={job} setdata={setData} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default JobContainer;
