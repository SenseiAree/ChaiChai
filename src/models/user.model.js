import mongoose from "mongoose";
import { addressSchema } from "./customSchemas/address.schema.js";
import { contactSchema } from "./customSchemas/contact.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
      required: [true, "Name is required."],
      trim: true,
      index: true,
    },
    emailId: {
      type: String,
      required: [true, "Email Id is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: [true, "Password is required."] },
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
      enum: ["Customer", "Employee"],
      default: "Customer",
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
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
