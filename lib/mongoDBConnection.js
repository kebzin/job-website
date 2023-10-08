import mongoose from "mongoose";
import { connect } from "./actions/connect";

export async function ConnectToMongoDB() {
  try {
    await connect();
    console.log("connected to database"); // if connect is true then succesfully connected
  } catch (error) {
    console.log("error connecting to database:", error.message);
  }
}
