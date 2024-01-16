const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");

const app = express();
const port = 3000;

app.use(express.json()); // Middleware pour traiter les données JSON

async function startServer() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
    });

    // Route POST pour créer une publication
    app.post("/posts", async (req, res) => {
      try {
        console.log("Request body:", req.body); 
        const { title, content } = req.body;

        if (!title || !content) {
          return res.status(400).json({ error: "Title and content are required" });
        }

        const newPost = new Post({ title, content });
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
      } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Route GET pour récupérer toutes les publications
    app.get("/posts", async (req, res) => {
    try {
      const allPosts = await Post.getAllPosts(); // Utilisez la méthode statique
      res.status(200).json(allPosts);
    } catch (error) {
      console.error("Error retrieving posts:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

    // Route GET pour récupérer un post spécifique par son ID
    app.get("/posts/:id", async (req, res) => {
      try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(post);
      } catch (error) {
        console.error("Error retrieving post:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Route DELETE pour supprimer un post spécifique par son ID
    app.delete("/posts/:id", async (req, res) => {
      try {
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
          return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(deletedPost);
      } catch (error) {
        console.error("Error deleting post:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Reste de votre configuration et routes...

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

startServer();
