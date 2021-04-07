import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB5l1ilzYkPzRNoTn_-zOW9nHpBZRseAjk",
  authDomain: "workout-tracker-94b1b.firebaseapp.com",
  projectId: "workout-tracker-94b1b",
  storageBucket: "workout-tracker-94b1b.appspot.com",
  messagingSenderId: "432283812347",
  appId: "1:432283812347:web:5ae44682f3144754f4cb5e"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : "";
// Initialize Firebase
// export const db = firebase.initializeApp(firebaseConfig).firestore();
export const auth = firebase.auth();
export const db = firebase.firestore();
