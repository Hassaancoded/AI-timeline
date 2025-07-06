import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDF6ozR5UXr4ix1WX6rYHC-lr57xlAq8ZE",
  authDomain: "ai-timeline-123c9.firebaseapp.com",
  projectId: "ai-timeline-123c9",
  storageBucket: "ai-timeline-123c9.appspot.com", 
  messagingSenderId: "4278863684",
  appId: "1:4278863684:web:d9b554b7dd8213f5a63911"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
