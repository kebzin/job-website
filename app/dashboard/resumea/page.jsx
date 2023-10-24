import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { GetResume } from "@/lib/actions/myResume";
import ResumeContainer from "@/components/Dashboard/resume/ResumeContainer";
const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/")}`);
  }

  const id = session?.user.id;
  const response = await GetResume({ id });
  console.log(response.created);
  return (
    <div className="min-h-screen">
      <Breadcrumb />
      <ResumeContainer />
    </div>
  );
};

export default page;
