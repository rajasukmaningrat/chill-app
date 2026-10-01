import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const getUsers = async (query = {}) => {
  let sql = "SELECT * FROM users";
  const params = [];

  if (query.username) {
    sql += " WHERE username = ?";
    params.push(query.username);
  }

  if (query.search) {
    sql += query.username ? " AND username LIKE ?" : " WHERE username LIKE ?";
    params.push(`%${query.search}%`);
  }

  if (query.sortBy === "username" || query.sortBy === "email") {
    sql += ` ORDER BY ${query.sortBy}`;
  }

  const [rows] = await pool.query(sql, params);
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );

  return rows[0];
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};

export const verifyEmail = async (token) => {
  const [rows] = await pool.query(
    "SELECT id FROM users WHERE verification_token = ?",
    [token]
  );

  return rows[0];
};

export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );

  return token;
};

export const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const verificationToken = uuidv4();

  const [result] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, verification_token) VALUES (?, ?, ?, ?, ?)",
    [user.fullname, user.username, user.email, hashedPassword, verificationToken]
  );

  return {
    result,
    email: user.email,
    verificationToken
  };
};

export const updateUser = async (id, user) => {
  const [result] = await pool.query(
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
    [user.username, user.email, user.password, id]
  );

  return result;
};

export const deleteUser = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM users WHERE id = ?",
    [id]
  );

  return result;
};
