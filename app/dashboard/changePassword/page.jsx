import Breadcrumb from "@/components/Common/Breadcrumb";
import PAsswordChangeForm from "./ChangePAsswordForm";

import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(
      `/signin?callbackUrl=${encodeURIComponent(`/dashboard/changePassword`)}`
    );
  }
  return (
    <>
      <Breadcrumb pageName={"Change Password"} />
      <PAsswordChangeForm id={session?.user?.id} />
    </>
  );
};

export default page;
