import Breadcrumb from "@/components/Common/Breadcrumb";
import RenderCandidate from "@/components/candidates/RenderCandidate";
import React from "react";

const page = () => {
  const data = [{}, {}, {}, {}];
  return (
    <>
      <Breadcrumb
        pageName={"Applicant For this Jobs"}
        description={"this are the list of the job you posted so fare"}
      />

      <div>
        <p className="pr-1 text-base font-medium text-body-color hover:text-primary cursor-pointer">
          3 Applicant for this job
          <div className=" grid grid-cols-3 gap-3  max-sm:grid-cols-1  max-xl:grid-cols-2 ">
            {data.map((job, index) => (
              <RenderCandidate key={index} viewingApplicant={true} />
            ))}
          </div>
        </p>
      </div>
    </>
  );
};

export default page;
