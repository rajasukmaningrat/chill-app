import { deleteUser, getUserById } from "./services/user.service.js";

try {
  const result = await deleteUser(1);

  console.log("User berhasil dihapus!");
  console.log("Rows affected:", result.affectedRows);

  const user = await getUserById(1);

  console.log("Data user setelah delete:");
  console.log(user);
} catch (error) {
  console.error("Gagal menghapus user:");
  console.error(error.message);
}
