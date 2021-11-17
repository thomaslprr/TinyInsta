import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAdAtdHJ5MTQNe5s5-VmJhIAW9icjIF8pg",
    authDomain: "tinygram2021.firebaseapp.com",
    projectId: "tinygram2021",
    storageBucket: "tinygram2021.appspot.com",
    messagingSenderId: "336706060084",
    appId: "1:336706060084:web:06d2bcd38a55ea1dac6f61"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
