import mongoose from "mongoose";
import { addressSchema } from "./customSchemas/address.schema.js";
import { contactSchema } from "./customSchemas/contact.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userTypes, genders } from "../constants.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Full Name of the user is required."],
      trim: true,
      index: true,
    },
    emailId: {
      type: String,
      required: [true, "Email Id of the user is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: [true, "Password of the user is required."] },
    contactInfo: { type: [contactSchema], default: [] },
    addresses: { type: [addressSchema], default: [] },
    displayPicture: {
      type: String, //Cloudinary URL
    },
    coverPicture: {
      type: String, //Cloudinary URL
    },
    userType: {
      type: String,
      enum: userTypes,
      default: userTypes[0],
    },
    gender: {
      type: String,
      enum: genders,
      default: genders[0],
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      emailId: this.emailId,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.Model("User", userSchema);
