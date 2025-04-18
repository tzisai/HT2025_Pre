// Funciones de autenticación

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseApp";

// Registrar nuevo usuario
export const registerUser = async (email: string, password: string, nombre: string, apellidos: string, telefono: string, tipo_usuario: string) => {

  const Email = email;
  const Password = password;
  const Nombre = nombre;
  const Apellidos = apellidos;
  const Telefono = telefono;
  const TipoCuenta = tipo_usuario

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(db);
    console.log(user.uid);
    await setDoc(doc(db, "usuarios", user.uid), {
      correo: Email,
      nombre: Nombre,
      apellidos: Apellidos,
      telefono: Telefono,
      tipo_cuenta: TipoCuenta,
      fechaRegistro: serverTimestamp()
    });

    console.log("Usuario "+Nombre+" registrado con éxito");

  } catch (error:any) {
    console.log(error)
    if (error.code === "auth/email-already-in-use") {
      console.error("El correo ya está en uso.");
    } else if (error.code === "permission-denied") {
      console.error("No tienes permiso para escribir en Firestore.");
    } else {
      console.error("Error al registrar el usuario:", error.message);
    } 
    throw error; 
  }
};

// Iniciar sesión
export const loginUser = async (email: string, password: string) => {
  console.log("Intentando iniciar sesión con:", email, password);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
    return userCredential.user;
  } catch (error: any) {
    console.error("Error de Firebase login:", error.code, error.message);
    if (error.code === "auth/user-not-found") {
      throw { code: "auth/user-not-found", message: "Usuario no encontrado." };
    } else if (error.code === "auth/wrong-password") {
      throw { code: "auth/wrong-password", message: "Contraseña incorrecta." };
    } else {
      throw {
        code: error.code || "auth/unknown-error",
        message: error.message || "Error al iniciar sesión.",
      };
    }
  }
};

// Cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada exitosamente.");
  } catch (error: any) {
    console.error("Error al cerrar sesión:", error.message);
    throw error;
  }
};