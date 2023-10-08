"use server";

import Company from "../../models/company";
import { ConnectToMongoDB } from "../mongoDBConnection";
import { revalidateTag } from "next/cache";

ConnectToMongoDB();

/**
 * Fetches companys from a MongoDB database based on the provided query, page number, and limit.
 * @param {Object} options - The options for fetching companys.
 * @param {string} options.query - The search query for company titles.
 * @param {number} options.page - The page number of results to fetch.
 * @param {number} options.limit - The maximum number of companys to fetch per page.
 * @returns {Object} - An object containing the fetched companys, pagination information, total company count, and skip value.
 */
export async function FetchAllCompanies({ query, page, limit }) {
  console.log(query, page, limit);
  try {
    const skip = (page - 1) * limit;
    const pipeline = [{ $skip: skip }, { $limit: limit }];

    if (query) {
      pipeline.unshift({
        $search: {
          index: "companyTitle",
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

    const companies = await Company.aggregate(pipeline);
    console.log(query, page, limit);

    console.log(companies);
    const totalcompanyCount = await Company.countDocuments();

    const isPreviousPage = page > 1;
    const isNextPage = totalcompanyCount > skip + companies.length;

    return {
      status: 200,
      companies,
      isPreviousPage,
      isNextPage,
      totalcompanyCount,
      skip,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Something went wrong while fetching companys",
    };
  }
}

export async function GetSinglecompany({ id }) {
  try {
    const singlecompany = await Company.findById({ _id: id });
    return {
      data: singlecompany,
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
