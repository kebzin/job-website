"use server";

import { ConnectToMongoDB } from "../mongoDBConnection";
import User from "@/models/userModul";
import { revalidatePath } from "next/cache";
import Notification from "../../models/Message";
ConnectToMongoDB();

export async function GetNotification({ id }) {
  try {
    const ExistUser = await User.findById({ _id: id });
    if (!ExistUser) return { status: 404, message: "User not found" };

    const notification = await Notification.find({ senderId: id }).populate(
      "senderId"
    );

    return { notification, status: 200, message: "Update successful" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "An error occurred while updating user." };
  }
}

// export async function addUser({ newUser }) {
//   try {
//     // Check if the user already exists by email
//     const existingUser = await User.findOne({ Email: newUser.Email });
//     if (existingUser) {
//       return { status: 400, message: "User with this email already exists" };
//     }

//     // Hash the user's password before saving it
//     const hashedPassword = await bcrypt.hash(newUser.Password, 10);
//     newUser.Password = hashedPassword;

//     // Create and save the new user
//     const user = await User.create({ ...newUser });
//     const company = await Company.create({ userId: user._id });

//     return { status: 200, message: "User added successfully" };
//   } catch (error) {
//     console.error(error);
//     return { status: 500, message: "An error occurred while adding the user" };
//   }
// }

// export async function GetSingUser({ id }) {
//   try {
//     const existingUser = await User.findById({ _id: id });
//     if (!existingUser) {
//       return { status: 400, message: "User does not  exists" };
//     }
//     return {
//       message: "user found success",
//       status: 200,
//       user: existingUser,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       status: 500,
//       message: "An error occurred while getting  the user",
//     };
//   }
// }

// export async function AppendApplicant({ id, jobId }) {
//   const existingUser = await User.findById({ _id: id });
//   try {
//     if (!existingUser) {
//       return { status: 400, message: "User does not exist" };
//     }

//     const existingJob = await Job.findById({ _id: jobId });
//     if (!existingJob) {
//       return { status: 400, message: "Job does not exist" };
//     } // Create a new applicant object

//     const applicant = await Applicant.create({
//       userId: id,
//       jobId: jobId,
//     });
//     const notification = await Notification.create({
//       title: `Application for ${existingJob.jobTitle}`,
//       body: `${
//         existingUser.FirstName + " " + existingUser.LastName
//       } has applied to your post`,
//       recipientId: existingJob.userId,
//       senderId: existingUser._id,
//       isRead: false,
//     });
//   } catch (error) {
//     console.log(error);
//     return {
//       status: 500,
//       message: "Internal server Error ",
//     };
//   }
// }
