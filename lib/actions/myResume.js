"use server";

import { ConnectToMongoDB } from "../mongoDBConnection";
import User from "@/models/userModul";
import { revalidatePath } from "next/cache";
import Resume from "../../models/myResume";
ConnectToMongoDB();

export async function GetResume({ id }) {
  try {
    const ExistUser = await User.findById({ _id: id });
    if (!ExistUser) return { status: 404, message: "User not found" };

    const resume = await Resume.findOne({ userId: id });
    if (!resume) {
      const resum = await Resume.create({ userId: id });
      return { resum, status: 200 };
    }
    return {
      resume,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "An error occurred while  featching resume.",
    };
  }
}
