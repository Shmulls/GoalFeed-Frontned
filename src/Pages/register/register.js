import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRegistrationRequest } from "../../API/Auth_calls";
import "./register.css";
import logo from "../login/goolfeedlogo.png";

function checkPassword(password) {
  // Password regex pattern to match the specified conditions
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
  return passwordRegex.test(password);
}

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Vpassword, setVPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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

  const handleVPasswordChange = (event) => {
    setVPassword(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      `Username: ${username}, Email: ${email}, Password: ${password}, Date of Birth: ${dateOfBirth}, Gender: ${gender}, Phone Number: ${phoneNumber}`
    );

    if (checkPassword(password) && password === Vpassword) {
      try {
        await sendRegistrationRequest({
          username,
          email,
          password,
          dateOfBirth,
          gender,
          phoneNumber,
        });
        navigate("/team_pic");
      } catch (error) {
        console.error(error);
      }
    } else {
      // Password verification failed
      alert(
        JSON.stringify({
          message:
            "Password verification failed. Make sure the password meets the requirements and matches the verification password.",
        })
      );
      setPassword("");
      setVPassword("");
    }
  };
  const handleBackToLogin = () => {
    navigate("/login");
  };

  // const handleMoveToHomePage = () => {
  //   navigate("/home");
  // };

  return (
    <div className="frame">
      <div className="background-image"></div>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <img className="logo" src={logo} alt="Our Logo" width={600} />
          <div>
            Username:
            <input type="username" value={username} onChange={handleUsernameChange} />
          </div>
          <br />
          <div>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <br />
          <div>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <br />
          <div>
            Verification Password:
            <input
              type="password"
              value={Vpassword}
              onChange={handleVPasswordChange}
            />
          </div>
          <br />
          <div>
            Phone Number:
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <br />
          <div>
            Date of Birth:
            <input
              type="date"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
            />
          </div>
          <br />
          <div>
            Gender:
            <select type="gender" value={gender} onChange={handleGenderChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <br />
          <div className="buttons">
            <button type="button" onClick={handleBackToLogin}>
              Back
            </button>
            <button type="submit">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
