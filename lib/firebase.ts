import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  };
  firebase.initializeApp(firebaseConfig);
}

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider);
};

export const logout = async () => {
  await firebase.auth().signOut();
};

export default firebase;
