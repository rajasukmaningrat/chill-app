// import { auth } from "../config/firebase";
// import { db } from "../config/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Login berhasil!");
    console.log(result.user);
    return result.user;
  } catch (error) {
    console.error("Login gagal:", error);
  }
};

export const registerWithUsername = async (userName, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", result.user.uid), {
      userName, email, createdAt: new Date(),
    });
    console.log("Registrasi berhasil!");
    console.log(result.user);
    return result.user;
  } catch (error) {
    console.error("Registrasi gagal:", error);
    return null;
  }
};

// export const registerWithEmail = async (email, password) => {
//   try {
//     const result = await createUserWithEmailAndPassword(auth, email, password);
//     return result.user;
//   } catch (error) {
//     console.error("Registrasi gagal:", error);
//     return null;
//   }
// };

export const loginWithUsername = async (userName, password) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("Username tidak ditemukan");
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const email = userDoc.data().email;

    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Login gagal:", error);
    return null;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("kode error", error.code);
    console.error("pesan:", error.message);
    return null;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("Logout berhasil!");
  } catch (error) {
    console.error("Logout gagal:", error);
  }
};