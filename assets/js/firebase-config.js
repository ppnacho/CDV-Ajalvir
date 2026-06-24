import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PEGA_AQUI_TU_API_KEY",
  authDomain: "PEGA_AQUI_TU_AUTH_DOMAIN",
  projectId: "PEGA_AQUI_TU_PROJECT_ID",
  storageBucket: "PEGA_AQUI_TU_STORAGE_BUCKET",
  messagingSenderId: "PEGA_AQUI_TU_MESSAGING_SENDER_ID",
  appId: "PEGA_AQUI_TU_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
