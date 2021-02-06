import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCLP52Pq_ef8JJihO4bFpAzkgihxfKaNXc",
  authDomain: "storyhub-6067b.firebaseapp.com",
  databaseURL: "https://storyhub-6067b.firebaseio.com",
  projectId: "storyhub-6067b",
  storageBucket: "storyhub-6067b.appspot.com",
  messagingSenderId: "610126553911",
  appId: "1:610126553911:web:c7526b69cec4be364ab0b2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;