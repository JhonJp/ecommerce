import firebase from 'firebase/app';
import 'firebase/firebase-database';
import 'firebase/firebase-auth';

const firebaseConfig = {
    apiKey: "AIzaSyDa8eJVeNBKDuvI3zR5hIFUuyDy3KqWUUo",
    authDomain: "forthnite.firebaseapp.com",
    databaseURL: "https://forthnite-default-rtdb.firebaseio.com",
    projectId: "forthnite",
    storageBucket: "forthnite.appspot.com",
    messagingSenderId: "818259694637",
    appId: "1:818259694637:web:6f4eaa0047e3e2a416d4a4",
    measurementId: "G-X8QJ3Y6503"
  };
  // Initialize Firebase
 const fire = firebase.initializeApp(firebaseConfig);
 

export default fire;