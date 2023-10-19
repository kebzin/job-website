import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import PostJobs from "@/components/Dashboard/jobs/PostJob";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const PostJob = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/dashboard/postJob")}`);
  }
  return (
    <div className="w-full">
      <Breadcrumb pageName={"Post Job"} />
      <PostJobs id={session?.user.id} />
    </div>
  );
};

export default PostJob;
