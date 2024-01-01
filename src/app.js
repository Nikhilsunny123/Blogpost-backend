import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import bodyParser from "body-parser";

import authAppRouter from "./routes/authRoutes";

dotenv.config();
const app = express();
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(bodyParser.json());
app.use("/user", authAppRouter);

//admin
app.use("/admin/foodapp", foodAppAdminRouter);

app.use("/foodapp", foodAppRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

// process.on("uncaughtException", function (err) {
//   console.log("Caught exception: ", err);
// });