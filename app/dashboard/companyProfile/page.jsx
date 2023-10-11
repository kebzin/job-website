import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CompanyProfileForm from "./CompanyProfileForm";

const page = () => {
  return (
    <>
      <Breadcrumb
        pageName={"Company Profilee"}
        description={
          " allows you to manage and refine your company's information, including your company logo, description, and contact details. You can update your company's profile to ensure it accurately represents your organization and appeals to potential job applicants"
        }
      />
      <CompanyProfileForm />
    </>
  );
};

export default page;
