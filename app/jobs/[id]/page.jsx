import Breadcrumb from "@/components/Common/Breadcrumb";
import { GetSingleJob } from "@/lib/actions/jobeAction";
import SingleJobContent from "@/components/Jobs/SingleJobs";

const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const Jobs = async ({ params }) => {
  const { id } = params;
  const data = await GetSingleJob({ id });

  const formatData = deepConvertToPlainObject(data?.data);

  return (
    <>
      <Breadcrumb
        pageName={data?.data?.jobTitle}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <SingleJobContent data={formatData} />
    </>
  );
};

export default Jobs;
