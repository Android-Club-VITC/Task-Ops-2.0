// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCluUZI_2mn5S-HLXbY4u4uJkd7yHZts9o",
  authDomain: "task-ops-c35f5.firebaseapp.com",
  projectId: "task-ops-c35f5",
  storageBucket: "task-ops-c35f5.appspot.com",
  messagingSenderId: "74317779247",
  appId: "1:74317779247:web:4e78373d7cf00c987a91da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Collections
const teams = collection(db, "Team");
const tasklist = collection(db, "Tasks");
const admin = collection(db, "Admin");
const member = collection(db, "Members");
const options = collection(db, "Options");

module.exports = {app, db, teams, admin, member, tasklist, options};