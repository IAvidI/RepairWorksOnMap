import React from 'react';
import Posts from './Posts';
import Login from './Login';

import "./App.css";

const Tabs = ({ polygons, activeTab, handleLogin, setPolygons }) => {
  return (
    <div className = "tabs">
      {(activeTab === 'login') ? <Login handleLogin={handleLogin}/> : null}
      {(activeTab === 'posts') ? <Posts cards={polygons} setCards={setPolygons} /> : null}
    </div>
  );
};

export default Tabs;