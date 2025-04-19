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
        <h1 className="text-2xl font-bold mb-4">Sobre Nosotros</h1>
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
          <p className="text-gray-600">Cargando información...</p>
        )}
      </div>

      <div className="text-container-1 px-4 py-6">
        <p className="mb-4">
          NovAureum es una plataforma desarrollada por Sophons, un equipo comprometido con transformar la educación y gestión financiera mediante tecnología avanzada. Nuestra misión es empoderar a las personas para que comprendan, organicen y optimicen sus finanzas de forma inteligente, sostenible e inclusiva.
        </p>
        <p className="mb-4">
          La plataforma combina gestión financiera personalizada con contenido educativo interactivo, ayudando a los usuarios a tomar decisiones informadas. Gracias a su sistema de Inteligencia Artificial basado en la arquitectura Mixture of Experts (MoE) e integraciones con modelos LLM como Deepseek, NovAureum ofrece análisis en tiempo real, recomendaciones especializadas y asistencia conversacional de alta precisión.
        </p>
        <p className="mb-2">
          Entre sus funcionalidades destacan:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Organización y análisis financiero en tiempo real</li>
          <li>Educación financiera adaptativa según el nivel del usuario</li>
          <li>Recomendaciones de ahorro e inversión personalizadas</li>
          <li>Análisis de mercado accesible</li>
          <li>Gestión de cartera digital y herramientas colaborativas con Islands</li>
        </ul>
      </div>
    </>
  );
}

export default About;
