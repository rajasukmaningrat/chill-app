const API_URL =
  "https://6a9502f30e895b145e5f9a1d.mockapi.io/api/v1/users";

// CREATE USER
export const registerWithUsername = async (userName, email, password) => {
  try {
    // Cek apakah username sudah digunakan
    const usernameResponse = await fetch(
      `${API_URL}?userName=${encodeURIComponent(userName)}`
    );

    if (!usernameResponse.ok) {
      throw new Error("Gagal mengecek username.");
    }

    const existingUsers = await usernameResponse.json();

    if (existingUsers.length > 0) {
      return {
        success: false,
        message: "Username sudah dipakai.",
      };
    }

    // Cek apakah email sudah digunakan
    const emailResponse = await fetch(
      `${API_URL}?email=${encodeURIComponent(email)}`
    );

    if (!emailResponse.ok) {
      throw new Error("Gagal mengecek email.");
    }

    const existingEmails = await emailResponse.json();

    if (existingEmails.length > 0) {
      return {
        success: false,
        message: "Email sudah digunakan.",
      };
    }

    // Buat user baru
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
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
      `${API_URL}?userName=${encodeURIComponent(userName)}`
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
      `${API_URL}?email=${encodeURIComponent(email)}`
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