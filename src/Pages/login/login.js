import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendLoginRequest } from "../../API/Auth_calls";
import "./login.css";
import logo from "./goolfeedlogo.png";

function checkPassword(password) {
  // Password regex pattern to match the specified conditions
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
  return passwordRegex.test(password);
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    if (checkPassword(password)) {
      try {
        await sendLoginRequest({
          email,
          password,
        });
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
      }
    } else {
      // Password does not meet the conditions
      alert(
        JSON.stringify({
          message:
            "Password should have at least one uppercase character, one lowercase character, one digit/number, one special character, and be between 8 and 12 characters.",
        })
      );
      setPassword(""); // Clear the password field
    }
  };

  return (
    <div className="frame">
      <div className="background-image"></div>

      <div className="form">
        <img className="logo" src={logo} alt="Our Logo" width={600} />
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
          <p>
            Forgot your password? <Link to="/">reset password</Link>
          </p>
          <br />
          <label>
            <input type="submit" value="Login" />
          </label>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
