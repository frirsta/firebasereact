import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth, db, onAuthStateChanged } from "../../firebase/firebase";
import {
  query,
  where,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { redirect } from "react-router-dom";

export const AuthContext = createContext();

const Context = ({ children }) => {
  const collectionUserRef = collection(db, "users");
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  const signInWithGoogle = async () => {
    try {
      const popup = await signInWithPopup(auth, provider);
      const user = popup.user;
      const q = query(collectionUserRef, where("uid", "==", user?.uid));
      const docs = await getDocs(q);
      console.log("popup", popup);
      if (docs.empty) {
        await addDoc(collectionUserRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          authProvider: popup?.providerId,
        });
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collectionUserRef, {
        uid: user.uid,
        name,
        providerId: "email/password",
        email: user.email,
      });
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const userStateChange = useCallback(async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionUserRef, where("uid", "==", user?.uid));
        onSnapshot(q, (doc) => {
          setUserData(doc?.docs[0]?.data());
        });
        setUser(user);
      } else {
        setUser(null);
        redirect("/signin");
      }
    });
  }, [collectionUserRef]);

  useEffect(() => {
    userStateChange();
  }, [userStateChange]);

  const initialState = {
    signInWithGoogle: signInWithGoogle,
    loginWithEmailAndPassword: loginWithEmailAndPassword,
    registerWithEmailAndPassword: registerWithEmailAndPassword,
    sendPasswordResetEmail: resetPassword,
    signOutUser: signOutUser,
    user: user,
    userData: userData,
  };

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export default Context;
