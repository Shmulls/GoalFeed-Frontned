import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendLoginRequest } from "../../API/Auth_calls";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    try {
      await sendLoginRequest({
        username,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <label>
          <input type="submit" value="Submit" />
        </label>
      </form>
    </div>
  );
}

export default Login;
