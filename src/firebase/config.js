import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAql8JXwlbMJqzHVhbjT10myZoOet9sDbw",
    authDomain: "muso-ninjas-aec17.firebaseapp.com",
    projectId: "muso-ninjas-aec17",
    storageBucket: "muso-ninjas-aec17.appspot.com",
    messagingSenderId: "299727584152",
    appId: "1:299727584152:web:1c95869c69eaf49b9b09ed"
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init servives
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectFirestore, projectAuth, projectStorage,timestamp}
