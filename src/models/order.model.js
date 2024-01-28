import { Schema, model } from "mongoose";
import { orderStatuses } from "../constants";

const cartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantityPurchased: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

const orderSchema = new Schema(
  {
    orderedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Ordered By is required."],
    },
    cartItems: {
      type: [cartItemSchema],
      required: [true, "Cart Items are required"],
      validate: [
        {
          /**
           *
           * @param {[Number]} value
           */
          validator: function (value) {
            return value.length > 0;
          },
          message: "Cart must have at least one item.",
        },
      ],
    },
    orderStatus: {
      type: String,
      enum: orderStatuses,
      default: orderStatuses[0],
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
