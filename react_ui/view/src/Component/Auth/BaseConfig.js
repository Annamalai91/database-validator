import * as firebase from 'firebase';
import "firebase/auth";

const baseconfig ={
  apiKey: "AIzaSyBtDNYQoU1Xz7zRPWWqOh3AZJFtGTN9QwA",
  authDomain: "practice-auth-6a25e.firebaseapp.com",
  databaseURL: "https://practice-auth-6a25e.firebaseio.com",
  projectId:"practice-auth-6a25e",
  storageBucket: "practice-auth-6a25e.appspot.com",
  messagingSenderId:189604387262
};
firebase.initializeApp(baseconfig);


export default firebase;
