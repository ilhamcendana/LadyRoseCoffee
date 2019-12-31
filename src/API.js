import firebase from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyAtJMT7_zOmAHVDWnt6R4i3_7p3kMz8LBo",
    authDomain: "ladyrosecoffee.firebaseapp.com",
    databaseURL: "https://ladyrosecoffee.firebaseio.com",
    projectId: "ladyrosecoffee",
    storageBucket: "ladyrosecoffee.appspot.com",
    messagingSenderId: "740534273037",
    appId: "1:740534273037:web:03e77609ad2a4d9b530144",
    measurementId: "G-46N6FQ586J"
};

firebase.initializeApp(firebaseConfig);

export default firebase;