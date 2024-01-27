import { Schema, model } from "mongoose";

const productPictureSchema = Schema(
  {
    thumbnail: {
      type: String, //Cloudinary URL
      required: [true, "Product Thumbnail Picture is required."],
    },
    galleryPictures: {
      type: [String], //Cloudinary URL
      default: [],
    },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Name of the product is required."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description of the product is required."],
    },
    price: {
      type: Number,
      required: [true, "Price of the product is required."],
    },
    productPicture: {
      type: productPictureSchema,
      required: [true, "Product Picture is required."],
    },
  },
  { timestamps: true }
);
