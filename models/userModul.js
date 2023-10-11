import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters."],
    },
    LastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters."],
    },
    UserName: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true,
      minlength: [4, "Username should be at least 4 characters long."],
      maxlength: [50, "Username cannot exceed 50 characters."],
    },
    Email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    Password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password should be at least 6 characters long."],
    },
    role: {
      type: String,
      default: "Candidate",
    },
    skills: [{ type: String }],
    regonizein: { type: String },

    age: {
      type: String,
      default: "",
    },
    // PhoneNumber: {
    //   type: String,
    //   default: "",
    // },
    Address: { type: String, require: true, default: "" },
    Gender: {
      type: String,
      default: "",
    },

    // Additional fields specific to your job portal can be added here
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
