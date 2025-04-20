import React from "react";
import "./services.css";

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
      <img src={imageUrl} className="card-img-top" alt={title + " image"} />
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
