import "./team_pic.css"
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendLoginRequest } from "../../API/Auth_calls";
import logo from "../login/goolfeedlogo.png";
import MHFC from "./MHFC.png"

export default function Team_pic() {
    const [team, setEmail] = useState("");
    const handlePasswordChange = (event) => {
        const newteam = event.target.value;
        setPassword(newteam);
      };
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
          try {
            await sendLoginRequest({
              team
            });
            navigate("/home");
          } catch (error) {
            console.error(error);
          }
        
      };

    return (
        <div className="team-pic">
            <div className="background-image"></div>
            <div className="team-pic-container">
              <img className="logo" src={logo} alt="Our Logo" />
              <h2>Choose your favorite team</h2>
              <form onSubmit={handleSubmit}>
                <div className="team-pic-teams">
                    <input type="image" src={MHFC} width={90} />
                    <input type="image" src={MHFC} width={90} />
                    <input type="image" src={MHFC} width={90} />
                    <input type="image" src={MHFC} width={90} />
                    <input type="image" src={MHFC} width={90} />
                    <input type="image" src={MHFC} width={90} />
                    <input type="image" src={MHFC} width={90} />
                    <input type="image" src={MHFC} width={90} />
                    <input type="image" src={MHFC} width={90} />

                </div>

                </form>

            

            </div>
         
      </div>
    );
  }