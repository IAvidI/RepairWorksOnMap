import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting login form with:", { username, password });
        try {
            const response = await axios.post(
                "http://localhost:5432/dj-rest-auth/login/",
                {
                    username,
                    password,
                }
            );
            console.log(response.data);
            const { access_token, refresh_token } = response.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            localStorage.setItem("token", token);
            props.handleLogin();
            // setIsLoggedIn(true);
            setErrorMessage("");
            // Redirect user to protected route
        } catch (error) {
            console.error(error);
            setErrorMessage(
                "Incorrect username or password. Please try again."
            );
            // setIsLoggedIn(false);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label className="field-name">
                    Username
                    <input
                        className="field-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className="field-name">
                    Password
                    <input
                        id="password"
                        className="field-input"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"} Password
                    </span>
                </label>
                <button className="submit-button" type="submit">
                    Login
                </button>
                {errorMessage && (
                    <div className="error">
                        <p>{errorMessage}</p>
                    </div>
                )}
                <p>
                    Don't have an account?{" "}
                    <a
                        href="#"
                        onClick={() => props.handleTabClick("registration")}
                    >
                        Register here
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
