"use client";
import React, { useEffect, useState } from "react";
import SearchParams from "../Common/SearchParams";
import CandidateFilter from "../candidates/CandidateFilter";
import RenderCandidate from "./RenderCandidate";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CandidatesContainer = ({ candidate }) => {
  const [originalData, setOriginalData] = useState(candidate);
  const [data, setData] = useState(originalData);
  const [sortOrder, setSortOrder] = useState(""); // Default sorting order is newest
  const [showClearFilter, setShowClearFilter] = useState();
  const handleSortChange = (e) => {
    setSortOrder(e);
    filterCandidate(); // Call the filtering function with the selected values
  };

  useEffect(() => {
    setData(candidate);
  }, [candidate]);

  const filterCandidate = () => {
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
    <div className="container">
      <SearchParams
        candidate={"candidates"}
        placeholder={"Search for available candidates"}
      />

      <div className="flex mt-10 gap-5">
        {/* <CandidateFilter /> */}
        <div className="w-full">
          <div className="flex justify-between flex-wrap items-center">
            <Label className="mb-3">
              Showing <span className="text-primary">{data?.length}</span>{" "}
              Results
            </Label>
            <div className="flex items-center gap-3 max-sm:flex-wrap">
              {showClearFilter && (
                <Button
                  // onClick={clearFilter}
                  variant="destructive"
                  className="w-full py-6 marker"
                >
                  Clear Filter
                </Button>
              )}

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
            {data.length === 0 ? (
              <>
                <h3 className=" max-w-md text-cente items-center  text-base font-medium leading-relaxed text-body-color text-center my-10">
                  Oops it seems like there is not data avelable for this right
                  now{" "}
                </h3>
              </>
            ) : (
              data.map((candidat, index) => {
                return (
                  <RenderCandidate
                    key={index}
                    data={candidat}
                    setdata={setData}
                    originalData={originalData}
                    setShowClearFilter={setShowClearFilter}
                    // setdata={setData}
                  />
                );
              })
            )}
          </div>

          {/* <RenderCandidate /> */}
        </div>
      </div>
    </div>
  );
};

export default CandidatesContainer;
