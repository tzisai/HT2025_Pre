import React from "react";
import "./Card.css";

interface CardProps {
  title: string;
  titleLink: string;
  level: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({
  title,
  titleLink,
  level,
  description,
  imageUrl,
}) => (
  <div className="col-lg-3 col-md-5 col-12 mb-4">
    <div className="card">
      <div style={{ background: "#fff", padding: "10px", borderRadius: "5px" }}>
        <img src={imageUrl} className="card-img-top" alt={title + " image"} />
      </div>

      <div className="card-body">
        <h5>
          <a className="card-title" href={titleLink}>
            {title}
          </a>
        </h5>
        <h6 className="text-muted small">{level}</h6>
        <p className="card-text">{description}</p>
      </div>
    </div>
  </div>
);

export default Card;
