import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmWL2lQELBodIT1pQhN_Nvq8_eWRG0hN0",
  authDomain: "sistale-817ec.firebaseapp.com",
  projectId: "sistale-817ec",
  storageBucket: "sistale-817ec.appspot.com",
  messagingSenderId: "691774856270",
  appId: "1:691774856270:web:1ce7073d2236b1c7fcb71f",
  measurementId: "G-P9DEV5BTT5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
