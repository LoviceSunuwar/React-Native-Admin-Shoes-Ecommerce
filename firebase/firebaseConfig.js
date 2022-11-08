import firebase from "firebase/compat";
import "firebase/firestore"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/compat/app";
import { getAnalytics } from "firebase/compat/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrihp3TRQkjcmul2ndFTfPKpcWgdIA_ig",
  authDomain: "reactnativecourseproject.firebaseapp.com",
  projectId: "reactnativecourseproject",
  storageBucket: "reactnativecourseproject.appspot.com",
  messagingSenderId: "836228769938",
  appId: "1:836228769938:web:3e060a5bb210c61b879e4b",
  measurementId: "G-R3CFJQP7NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// initalizing the firebase or firestore app
const db = firebase.firestore(app);

// This is the reference for the db we created at top
 

export const ShoesRef = db.collection("Shoes");

export {firebase};