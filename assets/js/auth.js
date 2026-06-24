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

    const usuario = snap.data();

    if (!usuario.activo) {
        await signOut(auth);
        throw new Error("Usuario desactivado.");
    }

    return usuario;
}

export async function cerrarSesion() {
    await signOut(auth);
    window.location.href = getLoginUrl();
}

export function protegerPagina(rolNecesario) {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = getLoginUrl();
            return;
        }

        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            await signOut(auth);
            window.location.href = getLoginUrl();
            return;
        }

        const usuario = snap.data();

        if (!usuario.activo) {
            await signOut(auth);
            window.location.href = getLoginUrl();
            return;
        }

        if (rolNecesario === "socio" && usuario.rol !== "socio" && usuario.rol !== "directiva") {
            window.location.href = getLoginUrl();
            return;
        }

        if (rolNecesario === "directiva" && usuario.rol !== "directiva") {
            window.location.href = getLoginUrl();
        }
    });
}

function getLoginUrl() {
    const path = window.location.pathname;

    if (path.includes("/socios/") || path.includes("/directiva/")) {
        return "../login.html";
    }

    return "login.html";
}
