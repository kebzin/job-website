import AboutSectionOne from "@/components/About/AboutSectionOne";
import CandidatesContainer from "@/components/candidates/CandidatesContainer";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { FetchAllCandidate } from "../../lib/actions/candidatesAction";

const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
const Candidates = async ({ searchParams }) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 5;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const data = await FetchAllCandidate({ page, limit, query: search });

  if (data.status === 500) {
    throw new Error(`Failed to fetch jobs. Status code: ${data.status} `);
  }

  return (
    <>
      <Breadcrumb
        pageName="Avelable Candidates"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <CandidatesContainer candidate={data.result} />
    </>
  );
};

export default Candidates;
