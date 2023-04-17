import React from 'react';

import "./App.css";

const Posts = ({ cards, setCards }) => {
  const handleEdit = (id) => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.id === id) {
          // If card id matches the id passed to handleEdit, toggle edit mode
          return { ...card, editing: !card.editing };
        }
        return card;
      });
    });
  };

  const handleSave = (id, updatedProperties) => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.id === id) {
          // If card id matches the id passed to handleSave, update properties and exit edit mode
          return { ...card, properties: { ...card.properties, ...updatedProperties }, editing: false };
        }
        return card;
      });
    });
  };

  const handlePropertyChange = (id, property, value) => {
    setCards((prevCards) => {
      return prevCards.map((prevCard) => {
        if (prevCard.id === id) {
          // Update the specified property value in the card being edited
          return { ...prevCard, properties: { ...prevCard.properties, [property]: value } };
        }
        return prevCard;
      });
    });
  };

  const renderCards = () => {
    return cards.map((card) => {
      const {
        id,
        latlngs,
        center,
        properties: {
          creationDate,
          expectedFinishDate,
          responsiblePerson,
          tag,
        },
        editing
      } = card;
      return (
        <div key={id} className="card">
          <h3>Card ID: {id}</h3>
          {editing ? (
            <div>
              <input
                type="text"
                value={responsiblePerson}
                onChange={(e) =>
                  handlePropertyChange(id, "responsiblePerson", e.target.value)
                }
              />
              <input
                type="text"
                value={expectedFinishDate}
                onChange={(e) =>
                  handlePropertyChange(id, "expectedFinishDate", e.target.value)
                }
              />
              <button
                onClick={() => handleSave(id, { responsiblePerson, expectedFinishDate })}
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>Creation Date: {creationDate}</p>
              <p>Expected Finish Date: {expectedFinishDate}</p>
              <p>Responsible Person: {responsiblePerson}</p>
              <p>Tag: {tag}</p>
              <button onClick={() => handleEdit(id)}>Edit</button>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Card List</h1>
      {renderCards()}
    </div>
  );
};

export default Posts;