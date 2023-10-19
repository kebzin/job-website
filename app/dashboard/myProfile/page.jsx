import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import Profile from "@/components/Dashboard/myProfile/Profile";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { GetSingUser } from "@/lib/actions/userAction";

const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const MyProfile = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/")}`);
  }

  const id = session.user.id;
  const user = await GetSingUser({ id });

  const convertserverObject = deepConvertToPlainObject(user.user);

  return (
    <div className="w-full min-h-screen">
      <Breadcrumb pageName={"My Profile"} />
      <Profile user={convertserverObject} />
    </div>
  );
};

export default MyProfile;
