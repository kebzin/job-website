import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import PostJobs from "@/components/Dashboard/jobs/PostJob";
const PostJob = () => {
  return (
    <div className="w-full">
      <Breadcrumb pageName={"Post Job"} />
      <PostJobs />
    </div>
  );
};

export default PostJob;
