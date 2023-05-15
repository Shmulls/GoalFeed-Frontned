import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRegistrationRequest } from "../../API/Auth_calls";
import "./register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      `Username: ${username}, Email: ${email}, Password: ${password}, Date of Birth: ${dateOfBirth}, Gender: ${gender}`,
    );
    try {
      await sendRegistrationRequest({
        username,
        email,
        password,
        dateOfBirth,
        gender,
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
          Date of Birth:
          <input
            type="date"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <select value={gender} onChange={handleGenderChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label>
          <input type="submit" value="Register" />
        </label>
      </form>
    </div>
  );
}

export default Register;
