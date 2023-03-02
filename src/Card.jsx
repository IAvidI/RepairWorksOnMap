import React from 'react';

import "./App.css";

const Card = ({ polygon }) => {
  return (
    <div className="card">
      <h4>{polygon.id}</h4>
      <p><strong>Creation Date:</strong> {polygon.properties.creationDate}</p>
      <p><strong>Expected Finish Date:</strong> {polygon.properties.expectedFinishDate}</p>
      <p><strong>Responsible Person:</strong> {polygon.properties.responsiblePerson}</p>
      <p><strong>Tag:</strong> {polygon.properties.tag}</p>
    </div>
  );
};

export default Card;