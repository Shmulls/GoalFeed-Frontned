import { Link } from "react-router-dom";
import "./about.css";
import logo from "./logosce.jpeg";

function About() {
  return (
    <div>
      <h1>Welcome to our project within the course:</h1>
      <h2>"Project Management at Sami Shimon College."</h2>
      <p>Greetings from the team members:</p>
      <ul>
        <li>Shmuel Malikov</li>
        <li>Lynn Sadon</li>
        <li>Yuval Amar</li>
        <li>Sharon Angado</li>
        <li>Tal Sinay</li>
        <li>Elyasaf Sinvanai</li>
      </ul>
      <img src={logo} alt="Our Logo" />
      <Link to="/home">Go back to the homepage</Link>
    </div>
  );
}

export default About;
