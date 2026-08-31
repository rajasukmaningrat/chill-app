import { createContext, useContext, useEffect, useState } from "react";

import {
  registerWithUsername,
  loginWithUsername,
  loginWithEmail,
  signOutUser,
} from "../services/auth";

const AuthContext = createContext();

const SESSION_KEY = "chill_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek session ketika aplikasi pertama kali dibuka
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY));

      if (saved) {
        setUser(saved);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }

    setLoading(false);
  }, []);

  // REGISTER
  const register = async (userName, email, password) => {
    const result = await registerWithUsername(
      userName,
      email,
      password
    );

    return result;
  };

  // LOGIN DENGAN USERNAME
  const login = async (userName, password) => {
    const result = await loginWithUsername(
      userName,
      password
    );

    if (!result.success) {
      return result;
    }

    const loggedUser = {
      id: result.user.id,
      username: result.user.userName,
      email: result.user.email,
    };

    setUser(loggedUser);

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(loggedUser)
    );

    return {
      success: true,
      user: loggedUser,
    };
  };

  // LOGIN DENGAN EMAIL
  const loginEmail = async (email, password) => {
    const result = await loginWithEmail(email, password);

    if (!result.success) {
      return result;
    }

    const loggedUser = {
      id: result.user.id,
      username: result.user.userName,
      email: result.user.email,
    };

    setUser(loggedUser);

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(loggedUser)
    );

    return {
      success: true,
      user: loggedUser,
    };
  };

  // LOGOUT
  const logout = () => {
    signOutUser();

    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginEmail,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}