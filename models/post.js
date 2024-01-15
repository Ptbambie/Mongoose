const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Supprime les espaces inutiles avant et après le titre
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

// Ajoutez une méthode statique pour récupérer toutes les publications
postSchema.statics.getAllPosts = async function () {
  return this.find().sort({ createdAt: -1 }); // Trie par date de création, le plus récent en premier
};

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
