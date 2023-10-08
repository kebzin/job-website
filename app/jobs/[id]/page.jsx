import Breadcrumb from "@/components/Common/Breadcrumb";
import { GetSingleJob } from "@/lib/actions/jobeAction";
import SingleJobContent from "@/components/Jobs/SingleJobs";
const Jobs = async ({ params }) => {
  const { id } = params;
  const data = await GetSingleJob({ id });

  return (
    <>
      <Breadcrumb
        pageName={data?.data?.jobTitle}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <SingleJobContent data={data.data} />
    </>
  );
};

export default Jobs;
