import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import RenderSinfleUSer from "./RenderSinfleUSer";
const page = ({ params }) => {
  const id = params;
  return (
    <div>
      {" "}
      <Breadcrumb
        pageName="Single User"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <RenderSinfleUSer />
    </div>
  );
};

export default page;
