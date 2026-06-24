import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

function dniToEmail(dni) {
  return dni.trim().toUpperCase() + "@cdv-ajalvir.local";
}

export async function loginConDni(dni, password) {
  const email = dniToEmail(dni);
  const cred = await signInWithEmailAndPassword(auth, email, password);

  const ref = doc(db, "usuarios", cred.user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await signOut(auth);
    throw new Error("Usuario sin ficha interna.");
  }

  const data = snap.data();

  if (!data.activo) {
    await signOut(auth);
    throw new Error("Usuario desactivado.");
  }

  return data;
}

export async function cerrarSesion() {
  await signOut(auth);
  window.location.href = "../login.html";
}

export function protegerPagina(rolNecesario) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "../login.html";
      return;
    }

    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await signOut(auth);
      window.location.href = "../login.html";
      return;
    }

    const data = snap.data();

    if (!data.activo) {
      await signOut(auth);
      window.location.href = "../login.html";
      return;
    }

    if (rolNecesario === "socio") {
      if (data.rol !== "socio" && data.rol !== "directiva") {
        window.location.href = "../login.html";
      }
    }

    if (rolNecesario === "directiva") {
      if (data.rol !== "directiva") {
        window.location.href = "../login.html";
      }
    }
  });
}
