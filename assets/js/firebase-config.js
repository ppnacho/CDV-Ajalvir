import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAEWb-mkSxvl64bmVz9YGd_OcXUktqYRwc",
    authDomain: "cdv-ajalvir.firebaseapp.com",
    projectId: "cdv-ajalvir",
    storageBucket: "cdv-ajalvir.firebasestorage.app",
    messagingSenderId: "719161935060",
    appId: "1:719161935060:web:c75061ecd00563ec4ce741"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
