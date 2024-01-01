import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bodyParser from "body-parser";

import blogPostAppRouter from "./routes/blogRoutes";
import connectDB from "./db";

dotenv.config();
const app = express();
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(bodyParser.json());
app.use("/user", );

//admin
app.use("/blogpost", blogPostAppRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

// process.on("uncaughtException", function (err) {
//   console.log("Caught exception: ", err);
// });
