import React from "react";
import { useState } from "react";

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
          return {
            ...card,
            properties: { ...card.properties, ...updatedProperties },
            editing: false,
          };
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
          return {
            ...prevCard,
            properties: { ...prevCard.properties, [property]: value },
          };
        }
        return prevCard;
      });
    });
  };

  const [sortOption, setSortOption] = useState(null);

  const handleSort = (option) => {
    // Set the sorting option in state
    setSortOption(option);
  };

  const sortCards = (option) => {
    return cards.sort((a, b) => {
      let aValue, bValue;
      switch (option) {
        case "creationDate":
          aValue = new Date(a.properties.creationDate);
          bValue = new Date(b.properties.creationDate);
          break;
        case "expectedFinishDate":
          aValue = new Date(a.properties.expectedFinishDate);
          bValue = new Date(b.properties.expectedFinishDate);
          break;
        case "tag":
          aValue = b.properties.tag;
          bValue = a.properties.tag;
          break;
        default:
          break;
      }
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  };

  const renderCards = () => {
    let sortedCards = [...cards];
    if (sortOption) {
      sortedCards = sortCards(sortOption);
    }
    return sortedCards.map((card) => {
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
        editing,
      } = card;
      return (
        <div key={id} className="card">
          <h3>Area ID: {id}</h3>
          {editing ? (
            <div>
              <p>Creation Date: {creationDate}</p>
              <p>
                Expected Finish Date:{" "}
                <input
                  type="text"
                  value={expectedFinishDate}
                  onChange={(e) =>
                    handlePropertyChange(
                      id,
                      "expectedFinishDate",
                      e.target.value
                    )
                  }
                />
              </p>
              <p>
                Responsible Person:{" "}
                <input
                  type="text"
                  value={responsiblePerson}
                  onChange={(e) =>
                    handlePropertyChange(
                      id,
                      "responsiblePerson",
                      e.target.value
                    )
                  }
                />
              </p>
              <p>
                Tag:{" "}
                <input
                  type="text"
                  value={tag}
                  onChange={(e) =>
                    handlePropertyChange(id, "tag", e.target.value)
                  }
                />
              </p>
              <button
                onClick={() =>
                  handleSave(id, { responsiblePerson, expectedFinishDate, tag })
                }
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
      <h1>Areas List</h1>
      <div>
        <h2>Sort by:</h2>
        <button onClick={() => handleSort("creationDate")}>
          Creation Date
        </button>
        <button onClick={() => handleSort("expectedFinishDate")}>
          Expected Finish Date
        </button>
        <button onClick={() => handleSort("tag")}>Tag</button>
        <button onClick={() => setSortOption(null)}>Clear</button>
      </div>
      {renderCards()}
    </div>
  );
};

export default Posts;
