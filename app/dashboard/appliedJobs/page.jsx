import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CvManager from "@/components/Dashboard/CvManager/CvManager";
import { redirect } from "next/navigation";
import AppliedJobContainer from "./AppliedJobContainer";
import { MyAppliedJob } from "@/lib/actions/jobeAction";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/")}`);
  }

  const id = session?.user.id;

  const AppliedJobs = await MyAppliedJob({ id });
  console.log(AppliedJobs.myappliedjobs);
  return (
    <div className="min-h-screen">
      <Breadcrumb
        hidden={false}
        pageName={"Applied Jobs"}
        description={"List of jobs you Applied to"}
      />
      <AppliedJobContainer />
    </div>
  );
};
export default page;
