"use server";

import Job from "../../models/jobs";
import { ConnectToMongoDB } from "../mongoDBConnection";
import { revalidateTag } from "next/cache";

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

    console.log(query, page, limit);

    const jobs = await Job.aggregate(pipeline);
    console.log(query, page, limit);

    console.log(jobs);
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
