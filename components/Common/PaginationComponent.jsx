"use client";
import React, { useState } from "react";
import { Slider } from "../ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
const PaginationComponent = ({
  totalJobCount,
  page,
  limit,
  SkiptAmount,
  isPreviousPage,
  HasNextPage,
}) => {
  const [SliderValue, setSliderValue] = useState([page]);
  const router = useRouter();

  return (
    <div className="container flex items-center justify-center flex-col">
      <p className="text-base font-medium leading-relaxed text-body-color">
        Show <span className="text-primary">{SkiptAmount}</span> of{" "}
        <span className="text-primary/50">{totalJobCount}</span> Jobs
      </p>
      <Slider
        id="Price Range"
        max={[totalJobCount]}
        defaultValue={SliderValue}
        step={SkiptAmount}
        onValueChange={setSliderValue}
        className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 max-w-[200px]  mt-3 "
        aria-label="Price Range"
        disabled
      />

      <div className="flex items-center gap-5 flex-wrap mt-5">
        <Button
          disabled={isPreviousPage === true ? false : true}
          className="bg-primary/30"
        >
          <Link
            prefetch={false}
            href={`/jobs/?page=${page > 1 ? page - 1 : 1}&limit=${limit}`}
          >
            prev page
          </Link>
        </Button>
        {page} / {Math.ceil(5 / Number(limit))}
        <Button
          disabled={SkiptAmount > totalJobCount ? true : false}
          className="bg-primary/30"
        >
          <Link
            prefetch={false}
            href={`/jobs/?page=${Number(page) + 1}&limit=${limit}`}
          >
            {" "}
            Next Page
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PaginationComponent;
