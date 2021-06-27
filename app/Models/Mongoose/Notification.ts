import { Schema, model } from "@ioc:Mongoose";

export default model(
  "Notification",
  new Schema(
    {
      content: String,
      recipient_id: String,
      read: Boolean,
    },
    { timestamps: true }
  )
);
