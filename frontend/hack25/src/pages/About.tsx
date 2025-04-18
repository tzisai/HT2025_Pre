import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseApp";

function About() {
  const [info, setInfo] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const docRef = doc(db, "informacion", "about_us");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInfo(docSnap.data());
        } else {
          console.error("No se encontró el documento 'about_us'");
        }
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    };

    fetchAboutInfo();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Sobre Nosotros</h1>
        {info ? (
          Object.entries(info)
            .sort(([a], [b]) => a.localeCompare(b)) // ordena alfabéticamente por título
            .map(([title, content]) => (
              <div key={title} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ))
        ) : (
          <p>Cargando información...</p>
        )}
      </div>
    </>
  );
}

export default About;
