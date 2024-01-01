import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  postName: {
    type: String,
    required: true,
  },

  postMessage: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    // select: false
  },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;