"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const JobFilter = ({ originalData, setdata, setShowClearFilter }) => {
  const [open, setOpen] = useState(false);
  const [SliderValue, setSliderValue] = useState([2000]);

  const HandleFiltering = (value) => {
    let filteredData = [...originalData];
    filteredData = filteredData.filter((job) => job.gender === value);
    if (filteredData.length === 0) {
      setShowClearFilter(true);
    }
    setdata(filteredData);
  };

  const HandleDurationFilter = (value) => {
    let filteredData = [...originalData];
    filteredData = filteredData.filter((job) => job.jobType === value);
    if (filteredData.length === 0) {
      setShowClearFilter(true);
    }
    setdata(filteredData);
  };

  const HandleBeginnerLevel = (value) => {
    let filteredData = [...originalData];
    filteredData = filteredData.filter((job) => job.experienceLevel === value);
    if (filteredData.length === 0) {
      setShowClearFilter(true);
    }
    setdata(filteredData);
  };
  const HandleUrgent = (value) => {
    let filteredData = [...originalData];
    filteredData = filteredData.filter((job) => job.urgent === value);
    if (filteredData.length === 0) {
      setShowClearFilter(true);
    }
    setdata(filteredData);
  };

  return (
    <div className="bg-primary/[10%] py-7 px-6  flex flex-col gap-5 min-w-[270px]">
      <h1 className="text-center mb-3 text-heading3-bold">Filter</h1>

      {/* h3 */}

      <div>
        <Select
          onValueChange={(value) => HandleDurationFilter(value)}
          className="text-dark"
        >
          <SelectTrigger className="text-dark w-full py-6">
            <SelectValue
              className="text-dark"
              placeholder="Duration eg full time"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full Time">Full Time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Part Time">Part Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <span className=" text-gray-500 ">Experience Level</span>
        <Select
          onValueChange={(value) => HandleBeginnerLevel(value)}
          className=""
        >
          <SelectTrigger className="text-dark w-ful py-6">
            <SelectValue className="text-dark" placeholder="Experience Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner Level">Begginer Level</SelectItem>
            <SelectItem value="Middle Level">Middle Level</SelectItem>
            <SelectItem value="Senior Level">Senior Level</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <span className=" text-gray-500">Pricing Range</span>
        <Slider
          id="Price Range"
          max={[40000]}
          defaultValue={SliderValue}
          step={500}
          onValueChange={setSliderValue}
          className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 "
          aria-label="Price Range"
        />
        <span> GMD {SliderValue}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className=" text-gray-500 ">Gender Base </span>
        <Select
          o
          onValueChange={(value) => HandleFiltering(value)}
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
        <div className="flex flex-col gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
