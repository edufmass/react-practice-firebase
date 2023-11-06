// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export function firebaseConfig() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const config = {
        apiKey: process.env.NEXT_PUBLIC_APIKEY,
        authDomain: process.env.NEXT_PUBLIC_AUTDOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
        appId: process.env.NEXT_PUBLIC_APPID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
    };

    // Initialize Firebase
    const app = initializeApp(config);
    //const analytics = getAnalytics(app);
}

export async function firebaseRegisterUser(email, password) {
    const auth = getAuth();
    /*createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            //userCredentials.
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // 
        });;*/
    try {
        let credentials = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        return false;
    }
    return true;
}

export async function firebaseSignIn(email, password) {
    const auth = getAuth();
    /*signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });*/
    try {
        let credentials = await signInWithEmailAndPassword(auth, email, password);
    } catch(e) {
        return false;
    }
    return true;
}