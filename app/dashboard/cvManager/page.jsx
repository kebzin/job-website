import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CvManager from "@/components/Dashboard/CvManager/CvManager";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/")}`);
  }

  return (
    <div className="min-h-screen">
      <Breadcrumb
        pageName={"CV Manager"}
        description={
          "Upload and manage your CV here; you can delete and add new CVs. Please note that only one CV is required to be uploaded, and attempting to upload a new CV will automatically replace your previous one"
        }
      />
      <CvManager />
    </div>
  );
};
export default page;
