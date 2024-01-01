import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
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