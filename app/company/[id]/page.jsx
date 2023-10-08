import Breadcrumb from "@/components/Common/Breadcrumb";
import { GetSingleJob } from "@/lib/actions/jobeAction";
import SingleCompany from "@/components/Company/SingleCompany";
import { GetSinglecompany } from "@/lib/actions/companyActions";
const Jobs = async ({ params }) => {
  const { id } = params;
  const data = await GetSinglecompany({ id });

  return (
    <>
      <Breadcrumb
        pageName={"Single page"}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <SingleCompany data={data.data} />
    </>
  );
};

export default Jobs;
