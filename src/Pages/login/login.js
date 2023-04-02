import React, { useState } from "react";
import { sendLoginRequest } from "../../API/Auth_calls";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  const login_msg = async (username, password) => {
    console.log(`USERNAME:\t${username}\nPASSWORD:\t${password}`);
    await sendLoginRequest({
      username,
      password,
    });
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
          <input
            type="submit"
            value="Submit"
            onClick={() => login_msg(username, password)}
          />
        </label>
      </form>
    </div>
  );
}

export default Login;
