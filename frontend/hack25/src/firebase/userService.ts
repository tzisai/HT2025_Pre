// firebase/userService.ts
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseApp";

export const getNombreUsuario = async (uid: string): Promise<string | null> => {
  try {
    const docRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.nombre || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo el nombre del usuario:", error);
    return null;
  }
};
