import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRegistrationRequest } from "../../API/Auth_calls";
import "./register.css";

function checkPassword(password) {
  // Password regex pattern to match the specified conditions
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
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

    if (
      checkPassword(password) &&
      password === Vpassword
    ) {
      try {
        await sendRegistrationRequest({
          username,
          email,
          password,
          dateOfBirth,
          gender,
          phoneNumber,
        });
        navigate("/login");
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

  return (
    <div className="form">
      <div className="background-image"></div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="remail" value={email} onChange={handleEmailChange} />
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
          Verification Password:
          <input
            type="password"
            value={Vpassword}
            onChange={handleVPasswordChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
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
          <select type="gender" value={gender} onChange={handleGenderChange}>
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