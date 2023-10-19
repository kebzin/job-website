"use client";
import React from "react";
import RenderSingleJobContent from "./RenderSingleJobContent";
import RenderJobeOverview from "./RenderJobeOverview";
import CompanyProfileCard from "../Common/CompanyProfileCard";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import AppliedForThisJob from "../Jobs/AppliedForThisJob";
import { Textarea } from "../ui/textarea";
import { signIn, useSession } from "next-auth/react";
const SingleJobContent = ({ data }) => {
  const { data: session } = useSession();
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
              {session?.user ? (
                <AppliedForThisJob id={session?.user.id} jobId={data._id} />
              ) : (
                <div>
                  <DialogDescription>
                    Your are not login. to applied for a job please login in to
                    you account or if you don't have an account created one.
                  </DialogDescription>
                  <Button onClick={() => signIn()}>Sign In</Button>
                </div>
              )}
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
