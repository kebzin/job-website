import AboutSectionOne from "@/components/About/AboutSectionOne";
import CandidatesContainer from "@/components/candidates/CandidatesContainer";
import Breadcrumb from "@/components/Common/Breadcrumb";

const Candidates = () => {
  return (
    <>
      <Breadcrumb
        pageName="Avelable Candidates"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <CandidatesContainer />
    </>
  );
};

export default Candidates;
