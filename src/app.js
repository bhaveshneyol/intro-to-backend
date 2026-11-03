import express from "express"; 

const app = express();   // create an express app

app.use(express.json());

// routes import

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

// routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

// example route : http://localhost:4000/api/v1/users/register
export default app;