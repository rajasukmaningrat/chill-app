import express from "express";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/upload", uploadRoutes);
app.use("/", authRoutes);

export default app;
