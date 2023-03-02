import { useState, useRef, useEffect } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./App.css";

import MapComponent from "./MapComponent";
import NavBar from "./NavBar";
import Posts from "./Posts";
import Tabs from "./Tabs";

export default function App() {

  // see if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setLogInClicked(false);
      setActiveTab('login');
    } else {
      setIsLoggedIn(true);
      setActiveTab('posts');
    }
  };

  useEffect(() => {
    console.log("login changed:", isLoggedIn);
  }, [isLoggedIn]);

  // display login prompts
  const [logInClicked, setLogInClicked] = useState(false);

  const handleLoginClick = () => {
    if (logInClicked) {
      setLogInClicked(false);
    } else {
      setLogInClicked(true);
    }
  };
  
  // change content of the posts depending on the icon pressed
  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }

  const [areas, setAreas] = useState([]);

  return (
    <div className="App">
      <NavBar 
        isLoggedIn={isLoggedIn} 
        handleLogin={handleLogin}
        handleLoginClick={handleLoginClick}
      />

      {logInClicked && <Tabs
                          polygons={areas}
                          activeTab={activeTab}
                          handleLogin={handleLogin}
                        />
      }
      
      <MapComponent 
        areas={areas} 
        setAreas={setAreas} 
        isLoggedIn={isLoggedIn} 
      />
    </div>
  );
}