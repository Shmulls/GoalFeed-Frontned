import "./team_pic.css"
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendLoginRequest } from "../../API/Auth_calls";
import logo from "../login/goolfeedlogo.png";
import MHFC from "./MHFC.png"
import AFC from "./AFC.png"
import AHFC from "./AHFC.png"
import FCBJ from "./FCBJ.png"
import HBSFC from "./HBSFC.png"
import HHFC from "./HHFC.png"
import HJFC from "./HJFC.png"
import HTA from "./HTA.png"
import MTA from "./MTA.png"
import MNFC from "./MNFC.png"

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
                    <input type="image" src={AFC} width={90} />
                    <input type="image" src={AHFC} width={90} />
                    <input type="image" src={FCBJ} width={90} />
                    <input type="image" src={HBSFC} width={90} />
                    <input type="image" src={HHFC} width={90} />
                    <input type="image" src={HJFC} width={90} />
                    <input type="image" src={HTA} width={90} />
                    <input type="image" src={MNFC} width={90} />
                    <input type="image" src={MTA} width={90} />

                </div>

                </form>

            

            </div>
         
      </div>
    );
  }