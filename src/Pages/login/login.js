import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendLoginRequest } from "../../API/Auth_calls";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    try {
      await sendLoginRequest({
        email,
        password,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
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
          <input type="submit" value="Login" />
        </label>
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
