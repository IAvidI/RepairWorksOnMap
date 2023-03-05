import React, { useState } from 'react';
import "./App.css";

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting login form with:', { username, password });
    props.handleLogin();
    // add logic here to handle login submission
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className = "login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="field-name">
          Username
          <input className="field-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="field-name">
          Password
          <input
            id="password"
            className="field-input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'} Password
          </span>
          
        </label>
        <button className="submit-button" type="submit" >Login</button>
      </form>
    </div>
  );
}

export default Login;