import { getUsers, getUserById } from "./services/user.service.js";

try {
  const users = await getUsers();

  console.log("Semua users:");
  console.log(users);

  const user = await getUserById(1);

  console.log("User dengan ID 1:");
  console.log(user);
} catch (error) {
  console.error("Gagal mengambil data users:");
  console.error(error.message);
}
