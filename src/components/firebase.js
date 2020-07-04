import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyApxMPrrl4kZzH87WntxGtNO0IubLtncEQ",
    authDomain: "puzzle-hub.firebaseapp.com",
    databaseURL: "https://puzzle-hub.firebaseio.com",
    projectId: "puzzle-hub",
    storageBucket: "puzzle-hub.appspot.com",
    messagingSenderId: "163574315180",
    appId: "1:163574315180:web:34919b3d36d6054878c709",
    measurementId: "G-25KB6VZG5N"
  };

  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();