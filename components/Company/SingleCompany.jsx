import React from "react";
import CompanyProfileCard from "../Common/CompanyProfileCard";
import { Button } from "../ui/button";
import { Link2Icon } from "lucide-react";

const SingleCompany = ({ data }) => {
  console.log(data.data);
  return (
    <div className="container">
      <div className="flex  gap-3 mt-10 mb-20 max-lg:flex-wrap">
        <div>
          <h1 className="mb-5 text-heading3-bold font-bold  sm:text-3xl">
            About Company
          </h1>
          <p className="text-base font-medium leading-relaxed text-body-color line-clamp-6">
            {data?.aboutCompany}
          </p>

          <h1 className="mb-5 text-heading3-bold font-bold  sm:text-3xl mt-5">
            {" "}
            Focused on
          </h1>
          <p className="text-base font-medium leading-relaxed text-body-color line-clamp-6">
            {data?.focused}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-col w-full">
          {/* <RenderJobeOverview data={data} /> */}
          <CompanyProfileCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default SingleCompany;
