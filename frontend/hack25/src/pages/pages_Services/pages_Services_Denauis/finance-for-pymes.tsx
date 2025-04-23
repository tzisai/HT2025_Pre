import NavBar from "../../../components/NavBar";
import SideBar from "../../../components/components_Services/SideBar";
import { useState, useEffect } from "react";
import Pymes from "../../../assets/Pymes.svg";
import EnProceso from "../../../components/EnProceso";
import LevelPath from "../../../assets/Levels_path.png";

function FinanceForPyMEs() {
  const options = ["Seccion 1", "Seccion 2", "Seccion 3", "Seccion 4"];
  const [selected, setSelected] = useState(options[0]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const renderContent = () => {
    switch (selected) {
      case "Seccion 1":
        return <EnProceso imageUrl={LevelPath} />;
      case "Seccion 2":
        return <EnProceso imageUrl={LevelPath} />;
      case "Seccion 3":
        return <EnProceso imageUrl={LevelPath} />;
      case "Seccion 4":
        return <EnProceso imageUrl={LevelPath} />;
      default:
        return <p>Selecciona una sección para ver su contenido.</p>;
    }
  };

  return (
    <>
      <NavBar />

      {/* Sidebar para móviles (encabezado) */}
      <div className="d-md-none">
        <SideBar
          title="Finance for PyMEs"
          selected={selected}
          onSelect={setSelected}
          options={options}
          imageUrl={Pymes}
        />
      </div>

      {/* Layout de contenido para pantallas grandes */}
      <div className="container-fluid">
        <div
          className={isSmallScreen ? "md-grid" : "d-grid"}
          style={{
            gridTemplateColumns: "280px 1fr",
            minHeight: "100vh",
          }}
        >
          {/* Sidebar en desktop */}
          <div className="d-none d-md-block bg-light border-end">
            <SideBar
              title="Finance for PyMEs"
              selected={selected}
              onSelect={setSelected}
              options={options}
              imageUrl={Pymes}
            />
          </div>

          {/* Contenido principal: envuelto en un div que se adapta */}
          <div className="p-4">
            <div>
              <h2>{selected}</h2>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FinanceForPyMEs;
