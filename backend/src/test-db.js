import pool from "./db.js";

try {
  const [rows] = await pool.query("SELECT 1 AS connection_test");

  console.log("MySQL connection berhasil!");
  console.log(rows);
} catch (error) {
  console.error("MySQL connection gagal:");
  console.error(error.message);
} finally {
  await pool.end();
}
