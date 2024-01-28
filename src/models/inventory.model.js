import { Schema, model } from "mongoose";

const invertorySchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    outlet: {
      type: Schema.Types.ObjectId,
      ref: "Outlet",
      required: true,
    },

    quantityAvailable: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

export const Inventory = model("Inventory", invertorySchema);
