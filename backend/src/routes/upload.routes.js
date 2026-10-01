import express from "express";
import upload from "../services/upload.service.js";

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file
  });
});

export default router;