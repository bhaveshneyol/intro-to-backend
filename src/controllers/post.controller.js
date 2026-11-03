import { Post } from "../models/post.model.js";

// Create a post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({
                message: "All field are required"
            });
        }

        const post = await Post.create({ name, description, age });

        res.status(201).json({
            message: "Post created successfully", post
        });

       } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
};

// Read all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Update a post
const updatePost = async (req, res) => {
    try {
        // basic validation to check if the body is empty
        // {name: x, description: y, age: z} -> [name, description, age]
        // {} is truthy, so check the number of keys instead
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const { id } = req.params;

        const post = await Post.findByIdAndUpdate(id, req.body, {
            new: true,           // return the updated document
            runValidators: true  // apply schema rules to the new values
        });

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post updated successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post successfully deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting post",
            error: error.message
        });
    }
};

export { createPost, getPosts, updatePost, deletePost };
