import { createUser } from "./services/user.service.js";

try {
  const result = await createUser({
    username: "rajo",
    email: "rajo@example.com",
    password: "belajar123"
  });

  console.log("User berhasil dibuat!");
  console.log("ID user:", result.insertId);
} catch (error) {
  console.error("Gagal membuat user:");
  console.error(error.message);
}
