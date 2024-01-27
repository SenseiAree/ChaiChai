import mongoose from "mongoose";
import { country_list } from "../../constants.js";

export const addressSchema = new mongoose.Schema(
  {
    country: { type: String, required: [true, "Country Name is required."], trim: true, enum: country_list },
    state: { type: String, trim: true, required: [true, "State Name is required."] },
    city: { type: String, trim: true, required: [true, "City Name is required."] },
    street: { type: String, trim: true, required: [true, "Street Name is required."] },
  },
  { timestamps: true }
);
