import Breadcrumb from "@/components/Common/Breadcrumb";

import React from "react";
import ManageJobeCard from "./ManageJobeCard";
import { JobThatBelong_to_Me } from "@/lib/actions/jobeAction";
import { Button } from "@/components/ui/button";
const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const page = async () => {
  const id = "65047a7e1e9ab17564c82ced";
  const data = await JobThatBelong_to_Me({ id });

  const DeepFormat = deepConvertToPlainObject(data);
  return (
    <div>
      <Breadcrumb
        pageName={"Manage Your Jobs"}
        description={
          "These listings display the jobs you have posted thus far in your job portal account. This overview allows you to easily access and manage each job listing, making it simple to stay organized and make any necessary updates or adjustments as needed."
        }
      />
      <div className=" py-2 px-3  w-full">
        {/* render filter */}
        <Button>You posted {DeepFormat.length} Jobs</Button>
        {/* job card */}
        <div className=" grid grid-cols-3 gap-3  max-sm:grid-cols-1  max-xl:grid-cols-2 ">
          {DeepFormat.map((job, index) => (
            <ManageJobeCard job={job} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
