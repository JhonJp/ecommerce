import firebase from 'firebase/app';
import 'firebase/firebase-database';
import 'firebase/firebase-auth';

const firebaseConfig = {
    apiKey: "AIzaSyDIOqVyDGBZ4wvFYTNzVp85ViEuv_V8G6E",
    authDomain: "flcosmetics-34043.firebaseapp.com",
    databaseURL: "https://flcosmetics-34043.firebaseio.com",
    projectId: "flcosmetics-34043",
    storageBucket: "flcosmetics-34043.appspot.com",
    messagingSenderId: "435594154444",
    appId: "1:435594154444:web:57cb221a650f40c60d0d69",
    measurementId: "G-3B59G472F3"
  };
  // Initialize Firebase
 const fire = firebase.initializeApp(firebaseConfig);
 

export default fire;