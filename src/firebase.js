import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA8dlUtr0XGb6z4SgxSOOxKpbM0uTilLuM",
    authDomain: "react-chat-widget.firebaseapp.com",
    projectId: "react-chat-widget",
    storageBucket: "react-chat-widget.appspot.com",
    messagingSenderId: "784365557582",
    appId: "1:784365557582:web:cc9e14c0e79fec024b301f",
    measurementId: "G-EF7WSBW5KM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc };
