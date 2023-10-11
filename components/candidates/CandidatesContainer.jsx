import React from "react";
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

const CandidatesContainer = () => {
  return (
    <div className="container">
      <SearchParams
        candidate={"candidates"}
        placeholder={"Search for available candidates"}
      />

      <div className="flex mt-10 gap-5">
        <CandidateFilter />
        <div className="w-full">
          <div className="flex justify-between flex-wrap items-center">
            <Label>
              Showing <span className="text-primary">4</span> Results
            </Label>
            <div className="flex items-center gap-3 max-sm:flex-wrap">
              <Button
                // onClick={clearFilter}
                variant="destructive"
                className="w-full py-6 marker"
              >
                Clear Filter
              </Button>

              <Select
                // onValueChange={(e) => handleSortChange(e)}
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

          <RenderCandidate />
        </div>
      </div>
    </div>
  );
};

export default CandidatesContainer;
