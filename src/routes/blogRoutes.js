import express from "express";
import userAuthenticator from "../../common/userAuthenticator";
import BlogPost from "../models/BLogPost";

const blogPostAppRouter = express.Router();

blogPostAppRouter.get("/", userAuthenticator, async (req, res) => {
  try {
    const posts = await BlogPost.find({});

    return res.status(200).json({
      data: posts,
    });
  } catch (error) {
    let message = "Server Error";
    if (error.message) {
      message = error.message;
    }
    return res.status(500).json({ message: message });
  }
});

blogPostAppRouter.get("/:postid", userAuthenticator, async (req, res) => {
  try {
    const postid = req.params.postid;
    console.log(postid);
    const post = await BlogPost.findOne({ _id: postid });
    if (!post) {
      return res.status(500).json({ message: "food doesnt exist" });
    } else {
      return res.status(200).json({
        data: post,
      });
    }
  } catch (error) {
    let message = "Server Error";
    if (error.message) {
      message = error.message;
    }
    return res.status(400).json({ message: message });
  }
});

export default blogPostAppRouter;
