import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../services/user.service.js";
import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await getUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data users",
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data user",
      error: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await createUser(req.body);

    res.status(201).json({
      message: "User berhasil dibuat",
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat user",
      error: error.message
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const result = await updateUser(req.params.id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    res.json({
      message: "User berhasil di-update"
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update user",
      error: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    res.json({
      message: "User berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus user",
      error: error.message
    });
  }
});

export default router;
