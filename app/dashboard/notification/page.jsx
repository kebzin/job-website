import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import Notification from "@/components/Dashboard/message/MessageContainer";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GetNotification } from "../../../lib/actions/Notification";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/")}`);
  }

  const result = await GetNotification({ id: session?.user.id });
  console.log("Result", result.notification);
  return (
    <div className="min-h-screen">
      <Breadcrumb pageName={"Notification"} />
      <Notification notification={result.notification} />
    </div>
  );
};

export default page;
