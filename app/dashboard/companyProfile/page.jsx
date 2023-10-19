import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CompanyProfileForm from "./CompanyProfileForm";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { GetCompanyEdit } from "../../../lib/actions/companyActions";

const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(
      `/signin?callbackUrl=${encodeURIComponent("/dashboard/companyProfile")}`
    );
  }

  const id = session?.user.id;
  const company = await GetCompanyEdit({ id });
  const formatData = deepConvertToPlainObject(company.data);

  return (
    <>
      <Breadcrumb
        pageName={"Company Profilee"}
        description={
          " allows you to manage and refine your company's information, including your company logo, description, and contact details. You can update your company's profile to ensure it accurately represents your organization and appeals to potential job applicants"
        }
      />
      <CompanyProfileForm company={formatData} id={id} />
    </>
  );
};

export default page;
