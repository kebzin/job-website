"use server";

import Company from "@/models/company";
import Job from "../../models/jobs";
import { ConnectToMongoDB } from "../mongoDBConnection";
import User from "@/models/userModul";

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
  console.log(query, page, limit);
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
    return jobs;
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
    console.log(userExist);
    // const company = await Company.findOne({ userId: job.userId });

    // Create a new job
    const newJob = new Job({
      ...job,
      Category: job.Category,
    });

    // Save the new job to the database
    await newJob.save();

    // Append the company ID to the job
    // newJob.companyId = company.company._id;

    // Save the job with the updated company ID
    // await newJob.save();

    console.log(newJob);

    return { status: 200, message: "Job posted successfully" };
  } catch (error) {
    // Handle errors appropriately, e.g., log errors
    console.error("Error while posting a job:", error);
    return { status: 500, message: "Internal server error" };
  }
}
