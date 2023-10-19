import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import Profile from "@/components/Dashboard/myProfile/Profile";
import { getServerSession } from "next-auth/next";

import { redirect } from "next/navigation";
import { GetSingUser } from "@/lib/actions/userAction";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { truncate } from "fs";

const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const CandidateOnboarding = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/")}`);
  }

  const id = session.user.id;
  const user = await GetSingUser({ id });

  const convertserverObject = deepConvertToPlainObject(user.user);

  return (
    <div className="container">
      <Breadcrumb pageName={""} />
      <h1 className="text-heading1-semibold">Onboarding</h1>
      <p>Please compleat you company profile</p>
      <Profile route={true} user={convertserverObject} />
    </div>
  );
};

export default CandidateOnboarding;
