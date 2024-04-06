// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc_x6ZHJD3B8njdSGl86Yzmev4Qlhp_uI",
  authDomain: "netflix-gpt-1f8d1.firebaseapp.com",
  projectId: "netflix-gpt-1f8d1",
  storageBucket: "netflix-gpt-1f8d1.appspot.com",
  messagingSenderId: "310713438281",
  appId: "1:310713438281:web:5aa556e72836a6f546ef98",
  measurementId: "G-LS554WQTZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();