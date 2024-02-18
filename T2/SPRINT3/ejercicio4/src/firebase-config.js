import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVSHiP-Ds25ueusN92VoCFwMS0iQdBK7o",
  authDomain: "adaits.firebaseapp.com",
  projectId: "adaits",
  storageBucket: "adaits.appspot.com",
  messagingSenderId: "221391384113",
  appId: "1:221391384113:web:258d36e2784f5e6768ef10",
  measurementId: "G-VCEX56TQSF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
