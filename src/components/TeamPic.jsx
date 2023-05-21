import { useState } from "react";
import "./TeamPic.css";

export default function Team_pic({ handleTeamSelection }) {
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    handleTeamSelection(team);
  };

  return (
    <div className="team-pic">
      <div className="background-image"></div>
      <div className="team-pic-container">
        <h2
          style={{ padding: "10px 20px", margin: "5px", textAlign: "center" }}
        >
          Choose your favorite team
        </h2>
        <form>
          <div className="team-pic-teams">
            <button
              type="button"
              onClick={() => handleTeamClick("MHFC")}
              className={selectedTeam === "MHFC" ? "selected" : ""}
            >
              <img src="../assets/MHFC.png" width={90} alt="MHFC" />
            </button>
            <button
              type="button"
              onClick={() => handleTeamClick("AFC")}
              className={selectedTeam === "AFC" ? "selected" : ""}
            >
              <img src="../assets/AFC.png" width={90} alt="AFC" />
            </button>
            <button
              type="button"
              onClick={() => handleTeamClick("AHFC")}
              className={selectedTeam === "AHFC" ? "selected" : ""}
            >
              <img
                src="../assets/AHFC.png"
                width={90}
                height={90}
                alt="AHFC"
                style={{ objectFit: "contain" }}
              />
            </button>
            <button
              type="button"
              onClick={() => handleTeamClick("FCBJ")}
              className={selectedTeam === "FCBJ" ? "selected" : ""}
            >
              <img src="../assets/FCBJ.png" width={90} alt="FCBJ" />
            </button>
            <button
              type="button"
              onClick={() => handleTeamClick("HBSFC")}
              className={selectedTeam === "HBSFC" ? "selected" : ""}
            >
              <img
                src="../assets/HBSFC.png"
                width={90}
                height={90}
                alt="HBSFC"
                style={{ objectFit: "contain" }}
              />
            </button>
            <button
              type="button"
              onClick={() => handleTeamClick("HHFC")}
              className={selectedTeam === "HHFC" ? "selected" : ""}
            >
              <img
                src="../assets/HHFC.png"
                width={90}
                height={90}
                alt="HHFC"
                style={{ objectFit: "contain" }}
              />
            </button>
            <button
              type="button"
              onClick={() => handleTeamClick("HJFC")}
              className={selectedTeam === "HJFC" ? "selected" : ""}
            >
              <img src="../assets/HJFC.png" width={90} height={90} alt="HJFC" />
            </button>
            <button
              type="button"
              onClick={() => handleTeamClick("HTA")}
              className={selectedTeam === "HTA" ? "selected" : ""}
            >
              <img src="../assets/HTA.png" width={90} alt="HTA" />
            </button>
            <button
              type="button"
              onClick={() => handleTeamClick("MTA")}
              className={selectedTeam === "MTA" ? "selected" : ""}
            >
              <img src="../assets/MTA.png" width={90} alt="MTA" />
            </button>
            <button
              type="button"
              onClick={() => handleTeamClick("MNFC")}
              className={selectedTeam === "MNFC" ? "selected" : ""}
            >
              <img src="../assets/MNFC.png" width={90} alt="MNFC" />
            </button>

            {/* Add the rest of the teams here */}
          </div>
        </form>
      </div>
    </div>
  );
}
