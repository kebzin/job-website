import Breadcrumb from "@/components/Common/Breadcrumb";

import React from "react";
import ManageJobeCard from "./ManageJobeCard";
import { JobThatBelong_to_Me } from "@/lib/actions/jobeAction";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(
      `/signin?callbackUrl=${encodeURIComponent("/dashboard/manageJobs")}`
    );
  }
  const id = session?.user.id;

  const data = await JobThatBelong_to_Me({ id });
  console.log(data?.jobs);

  const DeepFormat = deepConvertToPlainObject(data.jobs);
  const CompanyDeepFormat = deepConvertToPlainObject(data.MyCompany);
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
            <ManageJobeCard
              job={job}
              id={id}
              key={index}
              company={CompanyDeepFormat}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
