import React from 'react';
import Card from './Card';

import "./App.css";

const Posts = ({ polygons }) => {
  return (
    <div className = "posts">
      {polygons.map(polygon => (
        <Card key={polygon.id} polygon={polygon} />
      ))}
    </div>
  );
};

export default Posts;