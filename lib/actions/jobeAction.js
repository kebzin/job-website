"use server";

import Company from "@/models/company";
import Job from "../../models/jobs";
import { ConnectToMongoDB } from "../mongoDBConnection";
import User from "@/models/userModul";
import { revalidatePath } from "next/cache";
import Applicant from "@/models/Applicant";

ConnectToMongoDB();

/**
 * Fetches jobs from a MongoDB database based on the provided query, page number, and limit.
 * @param {Object} options - The options for fetching jobs.
 * @param {string} options.query - The search query for job titles.
 * @param {number} options.page - The page number of results to fetch.
 * @param {number} options.limit - The maximum number of jobs to fetch per page.
 * @returns {Object} - An object containing the fetched jobs, pagination information, total job count, and skip value.
 */
export async function FetchAllJobs({ query, page, limit }) {
  try {
    const skip = (page - 1) * limit;
    const pipeline = [{ $skip: skip }, { $limit: limit }];

    if (query) {
      pipeline.unshift({
        $search: {
          index: "jobTitle",
          text: {
            query,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 3,
              maxExpansions: 50,
            },
            path: {
              wildcard: "*",
            },
          },
        },
      });
    }

    const jobs = await Job.aggregate(pipeline);

    const totalJobCount = await Job.countDocuments();

    const isPreviousPage = page > 1;
    const isNextPage = totalJobCount > skip + jobs.length;

    return {
      status: 200,
      jobs,
      isPreviousPage,
      isNextPage,
      totalJobCount,
      skip,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Something went wrong while fetching jobs",
    };
  }
}

export async function GetSingleJob({ id }) {
  try {
    const singlejob = await Job.findById({ _id: id });
    return {
      data: singlejob,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: `Getting Single jon error ${error.message}`,
    };
  }
}

// job that i posted
export async function JobThatBelong_to_Me({ id }) {
  try {
    const jobs = await Job.find({ userId: id }).exec();
    const MyCompany = await Company.findOne({ userId: id });
    return {
      status: 200,
      message: "Job featch succesfull",
      jobs: jobs,
      MyCompany: MyCompany,
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      status: 500,
      message: "Something happen while featching your jobs",
    };
  }
}
//  post new job
export async function PostNewJob({ job }) {
  try {
    // Check if the user exists before posting jobs
    const userExist = await User.findById({ _id: job.userId });

    if (!userExist) {
      return { status: 409, message: "User not found" };
    }
    // const company = await Company.findOne({ userId: job.userId });

    // Create a new job
    const newJob = new Job({
      ...job,
      Category: job.Category,
    });

    // Save the new job to the database
    await newJob.save({ validateBeforeSave: false });

    // Append the company ID to the job
    // newJob.companyId = company.company._id;

    // Save the job with the updated company ID
    // await newJob.save();

    return { status: 200, message: "Job posted successfully" };
  } catch (error) {
    // Handle errors appropriately, e.g., log errors
    console.error("Error while posting a job:", error);
    return { status: 500, message: "Internal server error" };
  }
}

export async function DeleteJob({ id }) {
  try {
    const Delete = await Job.findByIdAndDelete({ _id: id });
    if (!Delete) {
      return { status: 401, message: "No such job exist" };
    }

    revalidatePath("/dashboard/manageJobs");
    return {
      status: 200,
      message: "Jobe has succesfully being deleted from our database",
    };
  } catch (error) {
    // Handle errors appropriately, e.g., log errors
    console.error("Error while deleting job:", error);
    return { status: 500, message: "Internal server error" };
  }
}

export async function UpdateJob({ jobcontent }) {
  try {
    const user = await User.findById({
      _id: jobcontent.userId,
    });
    if (!user) {
      return {
        // Return the response as a plain JavaScript object
        status: 404,
        message: "User not found to update the job data",
      };
    }

    const jobsdata = await Job.findByIdAndUpdate(
      { _id: jobcontent.jobid },
      { ...jobcontent },
      { new: true }
    ).exec();

    return {
      // Return the response as a plain JavaScript object
      status: 200,
      message: "update succesfull",
    };
  } catch (error) {
    console.error(error);
    return {
      // Return the response as a plain JavaScript object
      status: 500,
      message: "Something went wrong while Updating job",
    };
  }
}

export async function getAllMyJobWithApplicant({ id }) {
  try {
    const existingUser = await User.findById({ _id: id });
    if (!existingUser) {
      return { status: 400, message: "User does not exist" };
    }
    const jobapplied = await Job.find({ userId: id }).populate(
      "applicants.userId"
    );

    console.log(jobapplied);
    //console.log(jobapplied);
    function filterJobsWithApplicants(jobs) {
      // Filter jobs that have applicants
      const jobsWithApplicants = jobs.filter(
        (job) => job.applicants.length > 0
      );
      return jobsWithApplicants;
    }

    const JobWithApplicant = filterJobsWithApplicants(jobapplied);
    return {
      status: 200,
      JobWithApplicant,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function ApplicantForSingleJob({ id }) {
  try {
    const applicant = await Applicant.find({ jobId: id }).populate("userId");

    return {
      status: 200,
      message: "Applicant Featched Succesfull",
      applicant,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Something Went Wrong on the Server While Featching Applicant ",
    };
  }
}

export async function UpdateApplicantStatus({ data }) {
  try {
    const updateApplicant = await Applicant.findByIdAndUpdate(
      { _id: data.jobid },
      { ...data },
      { new: true }
    ).exec();

    return {
      message: "Applicantn update succesfullt",
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function MyAppliedJob({ id }) {
  try {
    // check ifthe user exisist
    const existingUser = await User.findById({ _id: id });
    if (!existingUser) {
      return { status: 400, message: "User does not exist" };
    }

    // check if i applied to any jobs
    const myappliedjobs = await Applicant.find({ userId: id })
      .populate("jobId")
      .sort("-createdAt");

    return {
      myappliedjobs,
      status: 200,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 200,
      message: "Internam server Error",
    };
  }
}
