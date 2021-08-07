import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD5yqaauKuFKyH20UFgAaRgaWC8eFcQWpY",
    authDomain: "hummytime-196f3.firebaseapp.com",
    projectId: "hummytime-196f3",
    storageBucket: "hummytime-196f3.appspot.com",
    messagingSenderId: "327955025917",
    appId: "1:327955025917:web:8da02f334bf0f83f589394",
    measurementId: "G-5404FZ6829"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();

  export  {db,fire}