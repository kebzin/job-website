import PaginationComponent from "@/components/Common/PaginationComponent";
import JobContainer from "@/components/Jobs/JobContainer";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { FetchAllJobs } from "../../lib/actions/jobeAction";
const dynamic = "force-dynamic";
const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const JobList = async ({ searchParams }) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 5;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const data = await FetchAllJobs({ page, limit, query: search });

  // Check if the response status is not 200 and throw an error
  if (data.status !== 200) {
    throw new Error(`Failed to fetch jobs. Status code: ${data.status} `);
  }
  // Sanitize the jobs array by extracting only required properties
  const sanitizedJobs = data.jobs.map((job) => ({
    id: job._id,
    userId: job.userId,
    description: job.description,
    jobTitle: job.jobTitle,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    applicationStatus: job.applicationStatus,
    experienceLevel: job.experienceLevel,
    salary: job.salary,
    applicationDeadLine: job.applicationDeadLine,
    urgent: job.urgent,
    gender: job.gender,
    status: job.status,
    location: job.location,
    isFeatured: job.isFeatured,
    jobType: job.jobType,
    applicants: job.applicants,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  }));

  const deepFormat = deepConvertToPlainObject(sanitizedJobs);
  return (
    <>
      <Breadcrumb pageName="Available Jobs" description="" />
      <JobContainer jobs={deepFormat} />
      <PaginationComponent
        page={page}
        limit={limit}
        totalJobCount={data.totalJobCount}
        SkiptAmount={data?.skip === 0 ? sanitizedJobs?.length : data?.skip}
        HasNextPage={data?.isNextPAge}
        isPreviousPage={data?.isPreviousPage}
      />
    </>
  );
};

export default JobList;
