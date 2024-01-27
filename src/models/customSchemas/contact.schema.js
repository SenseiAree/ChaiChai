import mongoose from "mongoose";

export const contactSchema = new mongoose.Schema(
  {
    countryCode: { type: Number, required: true },
    contactNumber: { type: Number, required: true },
  },
  { timestamps: true }
);
