import { Schema, model } from "mongoose";
import { addressSchema } from "./customSchemas/address.schema.js";

const outletSchema = new Schema(
  {
    outletName: {
      type: String,
      required: [true, "Outlet name is required."],
    },
    address: {
      type: addressSchema,
      required: [true, "Address of the Outlet is required."],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner Name of the Outlet is required."],
    },
    outletDisplayPicture: {
      type: String, // Cloudinary URL
    },
    outletGallery: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Outlet = model("Outlet", outletSchema);
