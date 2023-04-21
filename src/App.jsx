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
            handleTabClick("login");
            // setActiveTab('login');
        } else {
            setIsLoggedIn(true);
            handleTabClick("posts");
            // setActiveTab('posts');
        }
    };

    useEffect(() => {
        console.log("login changed:", isLoggedIn);
    }, [isLoggedIn]);

    // display login prompts
    const [logInClicked, setLogInClicked] = useState(false);

    const handleLoginClick = () => {
        if (logInClicked) {
            handleTabClick("login");
            setLogInClicked(false);
        } else {
            handleTabClick("login");
            setLogInClicked(true);
        }
    };

    // change content of the posts depending on the icon pressed
    const [activeTab, setActiveTab] = useState("login");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        console.log("Active tab changed:", activeTab);
    }, [activeTab]);

    const [areas, setAreas] = useState([]);

    return (
        <div className="App">
            <NavBar
                isLoggedIn={isLoggedIn}
                handleLogin={handleLogin}
                handleLoginClick={handleLoginClick}
                handleTabClick={handleTabClick}
            />

            {logInClicked && (
                <Tabs
                    polygons={areas}
                    activeTab={activeTab}
                    handleLogin={handleLogin}
                    setPolygons={setAreas}
                    handleTabClick={handleTabClick}
                />
            )}

            <MapComponent
                areas={areas}
                setAreas={setAreas}
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
}
