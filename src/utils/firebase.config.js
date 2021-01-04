import firebase from 'firebase';
import "firebase/auth";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
}
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export async function signInWithGoogle() {
    try {
        const credential = await auth.signInWithPopup(googleProvider);
        console.log(credential);
    } catch (err) {
        console.error(err);
    }
}

export async function signOutWithGoogle() {
    auth.signOut().then(() => {
        console.log(`Logged out!`);
    }).catch(err => {
        console.error(err.message);
    });
}