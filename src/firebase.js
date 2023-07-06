import firebase from 'firebase/compat/app'
import 'firebase/compat/messaging';

const firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "senderId",
    appId: "appId",
    measurementId: "measurementId"
};

firebase.initializeApp(firebaseConfig)

export default firebase.messaging