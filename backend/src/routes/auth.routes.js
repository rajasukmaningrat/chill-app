import express from "express";
import { createUser, loginUser, verifyEmail } from "../services/user.service.js";
import { sendMail } from "../services/mail.service.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await createUser(req.body);

    await sendMail(user.email, user.verificationToken);

    res.status(201).json({
      message: "User berhasil dibuat",
      id: user.result.insertId
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat user",
      error: error.message
    });
  }
});

router.get("/verify-email", async (req, res) => {
  try {
    const user = await verifyEmail(req.query.token);

    if (!user) {
      return res.status(400).json({
        message: "Invalid Verification Token"
      });
    }

    res.status(200).json({
      message: "Email Verified Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal verifikasi email",
      error: error.message
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await loginUser(
      req.body.email,
      req.body.password
    );

    if (!token) {
      return res.status(401).json({
        message: "Email atau password salah"
      });
    }

    res.status(200).json({
      message: "Login berhasil",
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal login",
      error: error.message
    });
  }
});

export default router;