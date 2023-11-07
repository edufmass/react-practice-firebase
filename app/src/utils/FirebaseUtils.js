// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, getFirestore, Timestamp } from 'firebase/firestore';
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

export async function firebaseGetAllCustomers(collectionName) {
    let customers = [];
    const auth = getAuth();
    const firestore = getFirestore();
    try {
        const coll = collection(firestore, collectionName);
        let result = await getDocs(coll);
        result.forEach(doc => {
            let elem = doc.data();
            elem.id = doc.id;
            customers.push(elem);
        });
    } catch(e) {

    }
    return customers;
}

export async function firebaseCreateCustomer(collectionName, values) {
    const firestore = getFirestore();
    const coll = collection(firestore, collectionName);
    try {
        let now = Timestamp.fromDate(new Date());
        const docRef = await addDoc(coll, {
            name: values.name,
            lastname: values.lastname,
            email: values.email,
            location: values.location,
            phone: values.phone,
            created_at: now
        });
        return true;
    } catch(e) {
        console.log(e);
        return false;

    }
}

export async function firebaseDeleteCustomer(collectionName, customerId) {
    const firestore = getFirestore();
    try {
        let result = await deleteDoc(doc(firestore, collectionName, customerId));
    } catch (error) {
        return false;
    }
    return true;
}