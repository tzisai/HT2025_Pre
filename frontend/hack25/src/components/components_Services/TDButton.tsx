import React from "react";
import "./TDButton.css";

interface ThreeDButtonProps {
  Quiz?: boolean;
  icon?: string;
  onClick?: () => void;
}

const ThreeDButton: React.FC<ThreeDButtonProps> = ({ Quiz, icon, onClick }) => {
  return (
    <>
      <button
        type="button"
        className={Quiz ? "qButton" : "tdButton"}
        onClick={onClick}
      >
        <img src={icon ? icon : ""} alt="Icon" className="icon" />
      </button>
    </>
  );
};

export default ThreeDButton;
