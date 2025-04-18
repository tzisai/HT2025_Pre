// src/utils/validateEmail.ts

import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";

export async function validateEmail(email: string): Promise<{ valid: boolean; message: string }> {
  const auth = getAuth();

  // Validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Formato de correo inválido." };
  }

  // Validación básica del dominio (mínimo contiene punto y 2 letras)
  const domain = email.split("@")[1];
  if (!domain || domain.length < 4 || !domain.includes(".")) {
    return { valid: false, message: "Dominio del correo inválido." };
  }

  try {
    // Verificar si el correo ya está registrado en Firebase
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
      return { valid: false, message: "Este correo ya está registrado." };
    }

    return { valid: true, message: "Correo válido." };
  } catch (error) {
    console.error("Error al verificar correo:", error);
    return { valid: false, message: "Error al verificar el correo." };
  }
}
