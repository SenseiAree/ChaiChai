import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is Running at Port ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log(`Server Error: ${error}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB Connection Failed: Logging Details\n${error}`);
  });
