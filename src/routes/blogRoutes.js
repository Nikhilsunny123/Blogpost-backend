import express from "express";
import userAuthenticator from "../helper/authMiddleware";
import BlogPost from "../models/BlogPost";
import mongoose from "mongoose";

const blogPostAppRouter = express.Router();

//get all posts
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

// get a single post
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

//add new posts
blogPostAppRouter.post("/add", userAuthenticator, async (req, res) => {
  try {
    const { postName, postMessage } = req.body;

    const newPost = new BlogPost({ postName, postMessage });
    const newPostResp = await newPost.save();
    console.log(newPostResp);
    return res.status(200).json({
      message: "Post added successfully",
      data: newPostResp,
    });
  } catch (error) {
    let message = "Server Error";
    if (error.message) {
      message = error.message;
    }
    return res.status(500).json({ message: message });
  }
});

//delete a post
blogPostAppRouter.delete("/:postid", userAuthenticator, async (req, res) => {
  try {
    const postid = req.params.postid;
    console.log(postid);
    const isValidObjectId = mongoose.Types.ObjectId.isValid;

    if (!isValidObjectId(postid)) {
      return res.status(500).json({ message: "Post doesnt exist" });
    }
    const Post = await BlogPost.findById(postid);
    console.log(Post);
    if (Post == null) {
      throw new Error("post doesnt exist");
    } else {
      const deletedPost = await BlogPost.findByIdAndDelete(postid);
      return res.status(200).json({
        message: "post deleted successfully",
        data: deletedPost,
      });
    }
  } catch (error) {
    let message = "Server Error";
    if (error.message) {
      message = error.message;
    }
    return res.status(500).json({ message: message });
  }
});

//update a post
blogPostAppRouter.put(
  "/:postid",

  userAuthenticator,
  async (req, res) => {
    try {
      const postid = req.params.postid;

      const isValidObjectId = mongoose.Types.ObjectId.isValid;

      if (!isValidObjectId(postid)) {
        return res.status(500).json({ message: "post doesnt exist" });
      }

      const { postName, postMessage } = req.body;
      const postCheck = await BlogPost.findById(postid);

      if (postCheck == null) {
        throw new Error("Post doesnt exist");
      } else {
        const updatedPost = await BlogPost.findByIdAndUpdate(
          postid,
          { postName, postMessage  },
          { new: true }
        );
        console.log(updatedPost);
        return res.status(200).json({
          message: "Post Updated successfully",
          data: updatedPost,
        });
      }
    } catch (error) {
      let message = "Server Error";
      if (error.message) {
        message = error.message;
      }
      return res.status(500).json({ message: message });
    }
  }
);

export default blogPostAppRouter;
