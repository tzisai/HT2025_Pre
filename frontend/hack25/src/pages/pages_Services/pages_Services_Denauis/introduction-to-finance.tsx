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
        return <p>Contenido de la Sección 1</p>;
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
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <div
          className="sticky-top bg-light"
          style={{ width: "280px", height: "100vh" }}
        >
          <SideBar
            title="Introduction to Finance"
            selected={selected}
            onSelect={setSelected}
            options={options}
            imageUrl={IntroFin}
          />
        </div>

        <div className="flex-grow-1 p-4 overflow-auto">
          <h2>{selected}</h2>
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default IntroductionToFinance;
