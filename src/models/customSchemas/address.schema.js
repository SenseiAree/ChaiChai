import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
  },
  { timestamps: true }
);
