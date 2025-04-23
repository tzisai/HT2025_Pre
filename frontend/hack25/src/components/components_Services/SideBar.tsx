import React, { useState } from "react";
import "./SideBar.css";

interface SideBarProps {
  title: string;
  selected: string;
  onSelect: (option: string) => void;
  options: string[];
  imageUrl?: string;
}

const SideBar: React.FC<SideBarProps> = ({
  title,
  options,
  selected,
  onSelect,
  imageUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Título con botón hamburguesa para móviles */}
      <div className="d-md-none d-flex align-items-center bg-light p-2 border-bottom justify-content-between sticky-top">
        <span className="fw-bold">{title}</span>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Sidebar para pantallas grandes */}
      <div
        className="d-none d-md-flex flex-column flex-shrink-0 p-3 bg-grey border-end"
        style={{ width: "280px", height: "100vh", position: "sticky", top: 0 }}
      >
        {imageUrl && (
          <img src={imageUrl} className="sidebar-thumbnail mb-3" alt="..." />
        )}
        <h2 className="fs-5 fw-semibold text-center">{title}</h2>
        <hr />
        <div className="list-group list-group-flush">
          {options.map((option) => (
            <button
              key={option}
              className={`btn text-start w-100 mb-2 ${
                selected === option ? "bg-purple" : "bg-grey"
              }`}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Offcanvas para móviles */}
      {isOpen && (
        <div
          className="offcanvas-overlay d-md-none"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="offcanvas-sidebar bg-light p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>{title}</h5>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            {imageUrl && (
              <img
                src={imageUrl}
                className="sidebar-thumbnail mb-3"
                alt="..."
              />
            )}
            <div className="list-group list-group-flush">
              {options.map((option) => (
                <button
                  key={option}
                  className={`btn text-start w-100 mb-2 ${
                    selected === option ? "bg-purple" : "bg-grey"
                  }`}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
