import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const Registration = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting registration form with:", {
            username,
            email,
            password1,
            password2,
        });
        try {
            const response = await axios.post("/dj-rest-auth/registration/", {
                username,
                email,
                password1,
                password2,
            });
            console.log(response.data);
            const { access_token, refresh_token } = response.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            props.handleTabClick("login");
            // props.handleLogin();
            // setIsLoggedIn(true);
            setErrorMessage("");
            // Redirect user to protected route
        } catch (error) {
            console.error(error);
            setErrorMessage("Registration failed. Please try again.");
            // setIsLoggedIn(false);
        }
    };

    const [showPassword1, setShowPassword1] = useState(false);

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    return (
        <div className="login">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label className="field-name">
                    Username
                    <input
                        id="username"
                        className="field-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className="field-name">
                    Email
                    <input
                        id="email"
                        className="field-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="field-name">
                    Password
                    <input
                        id="password1"
                        className="field-input"
                        type={showPassword1 ? "text" : "password"}
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                    <span onClick={togglePasswordVisibility1}>
                        {showPassword1 ? "Hide" : "Show"} Password
                    </span>
                </label>
                <label className="field-name">
                    Repeat password
                    <input
                        id="password2"
                        className="field-input"
                        type={showPassword2 ? "text" : "password"}
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <span onClick={togglePasswordVisibility2}>
                        {showPassword2 ? "Hide" : "Show"} Password
                    </span>
                </label>
                <button className="submit-button" type="submit">
                    Register
                </button>
                {errorMessage && <div className="error">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default Registration;
