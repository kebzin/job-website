"use client";
import React, { useTransition } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { AppendApplicant } from "@/lib/actions/userAction";
import { useSession } from "next-auth/react";
const AppliedForThisJob = ({ id, jobId }) => {
  let [isPending, startTransition] = useTransition();
  return (
    <div>
      <div className="flex flex-col gap-3">
        <Textarea
          className="text-black min-h-[200px]"
          placeholder="Enter message"
        />
        <Input type="file" className="text-center text-black" />
        <button
          onClick={() =>
            startTransition(() => {
              AppendApplicant({ id, jobId });
            })
          }
          className="bg-primary hover:bg-primary/30 py-4 px-4 rounded-md"
        >
          {isPending === true ? "Processing request" : "Applied Now"}
        </button>
      </div>
    </div>
  );
};

export default AppliedForThisJob;
