import NavBar from "../../../components/NavBar";
import SideBar from "../../../components/components_Services/SideBar";
import { useState } from "react";
import IntroFin from "../../../assets/intro_fin.svg";

function IntroductionToFinance() {
  const options = ["Seccion 1", "Seccion 2", "Seccion 3", "Seccion 4"];
  const [selected, setSelected] = useState(options[0]);

  const renderContent = () => {
    switch (selected) {
      case "Seccion 1":
        return <div></div>;
      case "Seccion 2":
        return <p>Contenido de la Sección 2</p>;
      case "Seccion 3":
        return <p>Contenido de la Sección 3</p>;
      case "Seccion 4":
        return <p>Contenido de la Sección 4</p>;
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
          title="Introduction to Finance"
          selected={selected}
          onSelect={setSelected}
          options={options}
          imageUrl={IntroFin}
        />
      </div>

      {/* Layout de contenido para pantallas grandes */}
      <div className="container-fluid">
        <div
          className="d-grid"
          style={{
            gridTemplateColumns: "280px 1fr",
            minHeight: "100vh",
          }}
        >
          {/* Sidebar en desktop */}
          <div className="d-none d-md-block bg-light border-end">
            <SideBar
              title="Introduction to Finance"
              selected={selected}
              onSelect={setSelected}
              options={options}
              imageUrl={IntroFin}
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

export default IntroductionToFinance;
