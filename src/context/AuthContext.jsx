import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { signInWithGoogle, signOutUser } from "../services/auth";

export const AuthContext = createContext();
function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    if (loginLoading) return;
    setLoginLoading(true);
    try {
      const user = await signInWithGoogle();
      return user;
    } finally {
      await setLoginLoading(false);
    }
  };
  const logout = async () => {
    signOutUser();
  };

  return(
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthProvider};
export function useAuth() {
  return useContext(AuthContext);
}