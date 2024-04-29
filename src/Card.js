import React from 'react';
import { Button } from 'react-bootstrap'; // Import Button component
import './Card.css';

const Card = ({ id, title, description, column, handleCardClick, handleDragStart, handleDelete, handleEdit }) => {
  const formatDate = () => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date().toLocaleDateString(undefined, options);
  };

  const getRandomUserImage = () => {
    const gender = Math.random() < 0.5 ? 'male' : 'female';
    return `https://xsgames.co/randomusers/avatar.php?g=${gender}`;
  };

  return (
    <div className="card" onClick={() => handleCardClick({ id, title, description, column })} draggable onDragStart={(e) => handleDragStart(e, id)}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <small className="text-muted">{formatDate()}</small>
        <div className="d-flex align-items-center">
          <Button variant="danger" className="btn-sm me-2" onClick={(e) => handleDelete(e, id)}>Delete</Button> {/* Use Button component */}
          <img src={getRandomUserImage()} alt="User" className="card-image" />
        </div>
      </div>
    </div>
  );
};

export default Card;
