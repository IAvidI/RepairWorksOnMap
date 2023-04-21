import React from "react";
import Posts from "./Posts";
import Login from "./Login";
import Registration from "./Registration";

import "./App.css";

const Tabs = ({
    polygons,
    activeTab,
    handleLogin,
    setPolygons,
    handleTabClick,
}) => {
    return (
        <div className="tabs">
            {activeTab === "login" ? (
                <Login
                    handleLogin={handleLogin}
                    handleTabClick={handleTabClick}
                />
            ) : null}
            {activeTab === "registration" ? (
                <Registration
                    handleLogin={handleLogin}
                    handleTabClick={handleTabClick}
                />
            ) : null}
            {activeTab === "posts" ? (
                <Posts cards={polygons} setCards={setPolygons} />
            ) : null}
        </div>
    );
};

export default Tabs;
