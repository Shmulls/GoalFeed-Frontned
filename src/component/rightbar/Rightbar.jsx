import Match from "../match/Match"
import "./rightbar.css"

export default function Rightbar(){
    return(
        <div className="right-bar">
            <div className="right-bar-container">
                <div className="right-game-container">
                    <Match/>
                    <Match/>
                    <Match/>

                </div>
            </div>
            
        </div>
    )
}