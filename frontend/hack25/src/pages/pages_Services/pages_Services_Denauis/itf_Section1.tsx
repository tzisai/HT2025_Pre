import React from "react";
import TDButton from "../../../components/components_Services/TDButton";
import info from "../../../assets/informacion.svg";
import libro from "../../../assets/libro.svg";
import pregunta from "../../../assets/pregunta.svg";
import video from "../../../assets/video.svg";

function ItfSection1() {
  return (
    <>
      <div className="button-path">
        <TDButton icon={info} />
        <div className="curve-line left"></div>
        <div className="curve-line right"></div>

        <TDButton icon={video} />
        <div className="curve-line left"></div>
        <div className="curve-line right"></div>

        <TDButton icon={libro} />
        <div className="curve-line center"></div>

        <TDButton Quiz={true} icon={pregunta} />
      </div>
    </>
  );
}

export default ItfSection1;
