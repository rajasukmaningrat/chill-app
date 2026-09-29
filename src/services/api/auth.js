import { API_URL } from "./config";

const USERS_URL = `${API_URL}/users`;

// CREATE USER
export const registerWithUsername = async (userName, email, password) => {
  try {
    // Ambil semua user
    const usersResponse = await fetch(USERS_URL);

    if (!usersResponse.ok) {
      throw new Error("Gagal mengambil data user.");
    }

    const users = await usersResponse.json();

    // Cek username
    const usernameExists = users.some(
      (user) =>
        user.userName?.toLowerCase() === userName.trim().toLowerCase()
    );

    if (usernameExists) {
      return {
        success: false,
        message: "Username sudah dipakai.",
      };
    }

    // Cek email
    const emailExists = users.some(
      (user) =>
        user.email?.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      return {
        success: false,
        message: "Email sudah digunakan.",
      };
    }

    // Buat user baru
    const response = await fetch(USERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName.trim(),
        email: email.trim(),
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Registrasi gagal.");
    }

    const user = await response.json();

    console.log("Registrasi berhasil!");
    console.log(user);

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Registrasi gagal:", error);

    return {
      success: false,
      message: "Terjadi kesalahan saat registrasi.",
    };
  }
};

// LOGIN USER
export const loginWithUsername = async (userName, password) => {
  try {
    const response = await fetch(
      `${USERS_URL}?userName=${encodeURIComponent(userName)}`
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data user.");
    }

    const users = await response.json();

    if (users.length === 0) {
      return {
        success: false,
        message: "Username tidak ditemukan.",
      };
    }

    const user = users.find((u) => u.password === password);

    if (!user) {
      return {
        success: false,
        message: "Username atau password salah.",
      };
    }

    console.log("Login berhasil!");
    console.log(user);

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Login gagal:", error);

    return {
      success: false,
      message: "Terjadi kesalahan saat login.",
    };
  }
};

// LOGIN DENGAN EMAIL
export const loginWithEmail = async (email, password) => {
  try {
    const response = await fetch(
      `${USERS_URL}?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data user.");
    }

    const users = await response.json();

    if (users.length === 0) {
      return {
        success: false,
        message: "Email tidak ditemukan.",
      };
    }

    const user = users.find((u) => u.password === password);

    if (!user) {
      return {
        success: false,
        message: "Email atau password salah.",
      };
    }

    console.log("Login berhasil!");
    console.log(user);

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Login gagal:", error);

    return {
      success: false,
      message: "Terjadi kesalahan saat login.",
    };
  }
};

// LOGOUT
export const signOutUser = () => {
  console.log("Logout berhasil!");
};

// GET USER LENGKAP UNTUK HALAMAN PROFIL
// Session di localStorage hanya menyimpan id, username, dan email
export const getUserById = async (userId) => {
  const response = await fetch(`${USERS_URL}?id=${encodeURIComponent(userId)}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data user.");
  }

  const users = await response.json();

  if (users.length === 0) {
    throw new Error("User tidak ditemukan.");
  }

  return users[0];
};

// UBAH DATA USER DARI HALAMAN PROFIL
export const updateUser = async (userId, changes) => {
  const response = await fetch(
    `${USERS_URL}/${encodeURIComponent(userId)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    }
  );

  if (!response.ok) {
    throw new Error("Gagal mengubah data user.");
  }

  return response.json();
};
