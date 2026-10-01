import { updateUser, getUserById } from "./services/user.service.js";

try {
  const result = await updateUser(1, {
    username: "rajo-update",
    email: "rajo-update@example.com",
    password: "belajar456"
  });

  console.log("User berhasil di-update!");
  console.log("Rows affected:", result.affectedRows);

  const user = await getUserById(1);

  console.log("Data user setelah update:");
  console.log(user);
} catch (error) {
  console.error("Gagal update user:");
  console.error(error.message);
}
