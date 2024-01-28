import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    countryCode: { type: String, required: [true, "Country Code is required"] },
    contactNumber: {
      type: String,
      required: [true, "Contact Number is required"],
    },
  },
  { timestamps: true }
);

contactSchema.pre("save", async function (next) {
  const regex = /[0-9]{1,10}/;
  if (regex.test(this.countryCode) && regex.test(this.contactNumber)) {
    next();
  } else {
    next(new Error("Your Contact Information is not valid."));
  }
});

export { contactSchema };
