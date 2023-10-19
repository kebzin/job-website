import mongoose, { model } from "mongoose";

// Job schema
const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    body: { type: String },
    isRead: { type: Boolean, default: false },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.notification || model("notification", NotificationSchema);
export default Notification;
