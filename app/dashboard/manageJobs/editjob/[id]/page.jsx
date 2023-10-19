import React from "react";
import EditJobs from "@/components/Jobs/EditJobs";
import { GetSingleJob } from "@/lib/actions/jobeAction";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumb from "@/components/Common/Breadcrumb";

const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
const EditSingleJob = async ({ params }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(
      `/signin?callbackUrl=${encodeURIComponent(
        `/dashboard/manageJobs/editjob/${id}`
      )}`
    );
  }

  const singleJobs = await GetSingleJob({ id });

  const formatJob = deepConvertToPlainObject(singleJobs.data);
  return (
    <>
      <Breadcrumb />
      <EditJobs singleJobs={formatJob} id={session?.user.id} />
    </>
  );
};

export default EditSingleJob;
