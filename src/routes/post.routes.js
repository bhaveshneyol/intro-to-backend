import { Router } from "express";
import { createPost, getPosts, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/getPosts").get(getPosts);
router.route("/updatePost/:id").put(updatePost);
router.route("/deletePost/:id").delete(deletePost);

export default router;