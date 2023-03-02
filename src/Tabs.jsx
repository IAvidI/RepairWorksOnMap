import React from 'react';
import Posts from './Posts';
import Login from './Login';

import "./App.css";

const Tabs = ({ polygons, activeTab, handleLogin }) => {
  return (
    <div className = "tabs">
      {(activeTab === 'login') ? <Login handleLogin={handleLogin}/> : null}
      {(activeTab === 'posts') ? <Posts polygons={polygons} /> : null}
    </div>
  );
};

export default Tabs;