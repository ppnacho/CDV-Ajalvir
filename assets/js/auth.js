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

function idSocioToEmail(idSocio) {
    return String(idSocio || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "") + "@cdv-ajalvir.local";
}

export async function loginConIdSocio(idSocio, password) {
    const email = idSocioToEmail(idSocio);
    const cred = await signInWithEmailAndPassword(auth, email, password);

    const ref = doc(db, "socios", cred.user.uid);
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

    return {
        ...usuario,
        uid: cred.user.uid
    };
}

export async function cerrarSesion() {
    await signOut(auth);
    const prefix = location.pathname.includes("/socios/") || location.pathname.includes("/directiva/") ? "../" : "";
    window.location.href = prefix + "login.html";
}

function tienePermiso(rolUsuario, rolNecesario) {
    const jerarquia = {
        socio: 1,
        directiva: 2,
        administrador: 3
    };

    return (jerarquia[rolUsuario] || 0) >= (jerarquia[rolNecesario] || 0);
}

export function protegerPagina(rolNecesario = "socio", callback) {
    onAuthStateChanged(auth, async (user) => {
        const prefix = location.pathname.includes("/socios/") || location.pathname.includes("/directiva/") ? "../" : "";

        if (!user) {
            window.location.href = prefix + "login.html";
            return;
        }

        const ref = doc(db, "socios", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            await signOut(auth);
            window.location.href = prefix + "login.html";
            return;
        }

        const usuario = snap.data();

        if (!usuario.activo || !tienePermiso(usuario.rol, rolNecesario)) {
            await signOut(auth);
            window.location.href = prefix + "login.html";
            return;
        }

        if (typeof callback === "function") {
            callback({ ...usuario, uid: user.uid });
        }
    });
}
