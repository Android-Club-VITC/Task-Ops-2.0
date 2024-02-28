import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJVm8ibrouduk3lePjqMPaku493QHi3xc",
  authDomain: "task-ops-c35f5.firebaseapp.com",
  projectId: "taskops-8161e",
  storageBucket: "taskops-8161e.appspot.com",
  messagingSenderId: "715468280946",
  appId: "1:715468280946:android:3285be505fe73eeeba5eeb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const tasks = collection(db, "Tasks");
const teams = collection(db, "Teams");
const rounds = collection(db, "Rounds");

export { app, tasks, teams, rounds };
