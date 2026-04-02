import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDmBz-gIHdG6AJh24-WaD08Rh4vALngosM",
  authDomain: "tabby-b0189.firebaseapp.com",
  projectId: "tabby-b0189",
  storageBucket: "tabby-b0189.firebasestorage.app",
  messagingSenderId: "40876582879",
  appId: "1:40876582879:web:2eef16a3425c62ce83066a"
};

const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

const handleLogout = () => {
    signOut(auth);
}
export default app;
export { signIn, handleLogout };