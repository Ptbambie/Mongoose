const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


postSchema.statics.getAllPosts = async function () {
  return this.find().sort({ createdAt: -1 }); 
};

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
