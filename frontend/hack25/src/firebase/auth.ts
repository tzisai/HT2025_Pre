// Funciones de autenticación

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    switch (error.code) {
      case "auth/user-not-found":
        throw new Error("Usuario no encontrado");
      case "auth/wrong-password":
        throw new Error("Contraseña incorrecta");
      case "auth/invalid-email":
        throw new Error("Correo electrónico no válido");
      default:
        throw new Error("Error al iniciar sesión");
    }
  }
};
