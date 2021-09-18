import firebase from "firebase/compat/app";
import "firebase/compat/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAViB2abs2aUyOch7caO2Uc7aZ0hCal6vo",
  authDomain: "pokemon-game-1222d.firebaseapp.com",
  databaseURL:
    "https://pokemon-game-1222d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-game-1222d",
  storageBucket: "pokemon-game-1222d.appspot.com",
  messagingSenderId: "632034996453",
  appId: "1:632034996453:web:91d2a740739da2764f640c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const fire = firebase;
export const database = firebase.database();

export default firebase;
