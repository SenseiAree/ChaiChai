import { Schema, model } from "mongoose";
import { country_list, discountTypes } from "../constants";

const freeItemSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const couponSchema = new Schema(
  {
    couponCode: {
      type: String,
      required: true,
      uppercase: true,
    },
    discount: {
      type: Number,
      min: 1,
    },
    discountType: {
      type: String,
      enum: discountTypes,
    },
    discountLimit: {
      type: Number,
    },
    freeItems: {
      type: [freeItemSchema],
    },
    purchaseType: {
      type: String,
    },
    purchaseAmount: {
      type: Number,
      min: 100,
    },
    countryValid: {
      type: String,
      required: true,
      enum: country_list,
    },
    expiresIn: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Coupon = model("Coupon", couponSchema);
