import express from "express"; 

const app = express();   // create an express app

app.use(express.json());

// routes import

import userRoutes from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRoutes);

// ecample route : http://localhost:4000/api/v1/users/register
export default app;