import AboutSectionOne from "@/components/About/AboutSectionOne";
import CompanyContainer from "@/components/Company/CompanyContainer";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { FetchAllCompanies } from "../../lib/actions/companyActions";

const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const Company = async ({ searchParams }) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 5;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const data = await FetchAllCompanies({ page, limit, query: search });

  // Deep convert the entire data object to plain objects
  const dataPlain = deepConvertToPlainObject(data);

  return (
    <>
      <Breadcrumb
        pageName="Available Companies"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <CompanyContainer companies={dataPlain.companies} />
    </>
  );
};

export default Company;
