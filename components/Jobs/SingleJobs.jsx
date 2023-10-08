import React from "react";
import RenderSingleJobContent from "./RenderSingleJobContent";
import RenderJobeOverview from "./RenderJobeOverview";
import CompanyProfileCard from "../Common/CompanyProfileCard";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import AppliedForThisJob from "../Jobs/AppliedForThisJob";
const SingleJobContent = ({ data }) => {
  return (
    <div className="container">
      <div className="flex  gap-3 mt-10 mb-20 max-lg:flex-wrap">
        <div>
          {" "}
          <RenderSingleJobContent data={data} />
        </div>
        <div className="flex items-center gap-3 flex-col w-full">
          <Dialog>
            <DialogTrigger className="w-full">
              <Button className="w-full py-7">Applied for this Job</Button>
            </DialogTrigger>
            <DialogContent>
              <AppliedForThisJob />
            </DialogContent>
          </Dialog>
          <RenderJobeOverview data={data} />
          <CompanyProfileCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default SingleJobContent;
