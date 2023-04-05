import React from 'react';

import "./App.css";

const Card = ({ polygon }) => {

  const handleEditCard = (polygon) => {
    // TODO: implement edit functionality
    const card = cards[cardIndex];
    const cardElement = document.getElementById(`card-${cardIndex}`);
    const cardTitle = cardElement.querySelector('.card-title');
    const cardDescription = cardElement.querySelector('.card-description');
    const cardButtons = cardElement.querySelector('.card-buttons');
  
    if (card.isEditing) {
      // Save changes
      card.title = cardTitle.value;
      card.description = cardDescription.value;
      card.isEditing = false;
  
      // Update card UI
      cardTitle.setAttribute('disabled', true);
      cardTitle.classList.remove('editing');
      cardTitle.innerText = card.title;
  
      cardDescription.setAttribute('disabled', true);
      cardDescription.classList.remove('editing');
      cardDescription.innerText = card.description;
  
      cardButtons.innerHTML = `
        <button class="btn-edit" onclick="handleEdit(${cardIndex})">Edit</button>
        <button class="btn-delete" onclick="handleDelete(${cardIndex})">Delete</button>
      `;
    } else {
      // Enter edit mode
      card.isEditing = true;
  
      // Update card UI
      cardTitle.removeAttribute('disabled');
      cardTitle.classList.add('editing');
      cardTitle.value = card.title;
  
      cardDescription.removeAttribute('disabled');
      cardDescription.classList.add('editing');
      cardDescription.value = card.description;
  
      cardButtons.innerHTML = `
        <button class="btn-save" onclick="handleEdit(${cardIndex})">Save</button>
      `;
    }
  }
  
  return (
    <div className="card">
      <h4>{polygon.id}</h4>
      <p><strong>Creation Date:</strong> {polygon.properties.creationDate}</p>
      <p><strong>Expected Finish Date:</strong> {polygon.properties.expectedFinishDate}</p>
      <p><strong>Responsible Person:</strong> {polygon.properties.responsiblePerson}</p>
      <p><strong>Tag:</strong> {polygon.properties.tag}</p>
      <button className="btn btn-primary" onClick={() => handleEditCard(area)}>Edit</button>
    </div>
  );
};

export default Card;