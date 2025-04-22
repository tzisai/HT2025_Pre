import React from "react";
import "./EnProceso.css";

interface EnProcesoProps {
  imageUrl?: string;
}

const EnProceso: React.FC<EnProcesoProps> = ({ imageUrl }) => {
  return (
    <div className="flex-container">
      <div className="glass-background"></div>
      <div className="foreground">
        <h1 className="title">🚧 En proceso 🚧</h1>
      </div>
      <div className="content ocultar-scroll">
        <p>
          {!imageUrl
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ullam neque voluptatibus voluptas nesciunt assumenda architecto facere quidem nisi blanditiis a accusamus voluptate laboriosam hic, eveniet possimus incidunt eaque dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ullam neque voluptatibus voluptas nesciunt assumenda architecto facere quidem nisi blanditiis a accusamus voluptate laboriosam hic, eveniet possimus incidunt eaque dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ullam neque voluptatibus voluptas nesciunt assumenda architecto facere quidem nisi blanditiis a accusamus voluptate laboriosam hic, eveniet possimus incidunt eaque dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ullam neque voluptatibus voluptas nesciunt assumenda architecto facere quidem nisi blanditiis a accusamus voluptate laboriosam hic, eveniet possimus incidunt eaque dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ullam neque voluptatibus voluptas nesciunt assumenda architecto facere quidem nisi blanditiis a accusamus voluptate laboriosam hic, eveniet possimus incidunt eaque dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ullam neque voluptatibus voluptas nesciunt assumenda architecto facere quidem nisi blanditiis a accusamus voluptate laboriosam hic, eveniet possimus incidunt eaque dolorem?"
            : null}
        </p>
      </div>
      <div className="image-container">
        <img src={imageUrl} alt="Levels" />
      </div>
    </div>
  );
};

export default EnProceso;
