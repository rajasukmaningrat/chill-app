import pool from "../db.js";

export const getUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");

  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );

  return rows[0];
};

export const createUser = async (user) => {
  const [result] = await pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [user.username, user.email, user.password]
  );

  return result;
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
