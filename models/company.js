import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "",
    },
    companyEmail: {
      type: String,
      default: "",
    },
    companyPhoneNumber: {
      type: String,
      default: "",
    },
    companyWebsite: {
      type: String,
      default: "",
    },
    companyAddress: {
      type: String,
      default: "",
    },
    industry: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      require: true,
      default: "",
    },
    linkedin: {
      type: String,
      require: true,
      default: "",
    },
    facebook: {
      type: String,
      require: true,
      default: "",
    },
    instagram: {
      type: String,
      require: true,
      default: "",
    },
    focused: {
      type: String,
      require: true,
      default: "",
    },
    aboutCompany: {
      type: String,
      require: true,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This should match the model name of your User schema
      default: "",
    },
  },
  { timestamps: true }
);

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;
