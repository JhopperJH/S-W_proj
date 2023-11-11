// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5ZDfILZl8u9mGdA4jyzm5xcuTSg_LQfM",
  authDomain: "sw-website-66.firebaseapp.com",
  projectId: "sw-website-66",
  storageBucket: "sw-website-66.appspot.com",
  messagingSenderId: "1043806272032",
  appId: "1:1043806272032:web:aa06253df0b6ceb702da45",
  databaseURL : "https://sw-website-66-default-rtdb.asia-southeast1.firebasedatabase.app.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

