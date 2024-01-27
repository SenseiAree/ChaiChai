import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category Name is required."],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model("Category", categorySchema);
