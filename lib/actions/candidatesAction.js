"use server";

import Company from "@/models/company";
import { ConnectToMongoDB } from "../mongoDBConnection";
import User from "@/models/userModul";
import { revalidatePath } from "next/cache";

ConnectToMongoDB();

const deepConvertToPlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
export async function FetchAllCandidate({ query, page, limit }) {
  console.log(query, page, limit);
  try {
    const skip = (page - 1) * limit;
    const pipeline = [{ $skip: skip }, { $limit: limit }];

    if (query) {
      pipeline.unshift({
        $search: {
          index: "user",
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

    const candidate = await User.aggregate(pipeline);
    const result = deepConvertToPlainObject(candidate);
    const totaluserCount = await User.countDocuments();
    const isPreviousPage = page > 1;
    const isNextPage = totaluserCount > skip + candidate.length;
    revalidatePath("/candidates");
    return {
      status: 200,
      isPreviousPage,
      isNextPage,
      totaluserCount,
      result,
      skip,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Something went wrong while fetching jobs",
      error,
    };
  }
}
