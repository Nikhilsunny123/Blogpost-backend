import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwtToken from "../helper/jwtToken";

const authAppRouter = express.Router();

//signup user
authAppRouter.post(
  "/signup",
  async (req, res) => {
    try {
   
      const { email, password } = req.body;
      console.log(req.body);
      const user = await User.findOne({ email });

      if (user) {
        return res
          .status(500)
          .json({ message: "this email already have an account" });
      } else {
        const securepassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          email,
          password: securepassword,
        });
        console.log(newUser);
        await newUser.save();

        return res.status(200).json({
          message: "User created successfully",
      
        });
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
);

//login user

authAppRouter.post(
  "/login",
 
  async (req, res) => {
    try {
     

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      console.log(user, "line 73");
      if (!user) {
        return res.status(500).json({ message: "user doesnt exist" });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Password is incorrect" });
          } else {
            const token = jwtToken(user);
            console.log(result, "line 82");
            return res.status(200).json({
              message: "Login successfully",
              data: user.fullname,
              token: token,
            });
          }
        });
      }
    } catch (error) {
      return res.status(400).json({ message: "Server error" });
    }
  }
);

export default authAppRouter;
