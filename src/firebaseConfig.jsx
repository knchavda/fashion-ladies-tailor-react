import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKSv-QlG7N1i6tbGTbjcZ-Tw9uslhSwgY",
  authDomain: "fashion-ladies-tailor-react.firebaseapp.com",
  projectId: "fashion-ladies-tailor-react",
  storageBucket: "fashion-ladies-tailor-react.firebasestorage.app",
  messagingSenderId: "689372838765",
  appId: "1:689372838765:web:dec9e3e20c71004dcd3864",
  measurementId: "G-L09DQZQPW8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);