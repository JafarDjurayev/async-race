import React from "react";
import Navigation from "../../components/Navigation";
import '../../styles/Garage.css';


export default function GaragePage(){
    return(
    <>
     <Navigation />
    <div className="container">
        <div className="controls">
            <div className="race-buttons">
                <button type="button">RACE</button>
                <button type="button">RESET</button>
            </div>
            <form>
                <input type="text" placeholder="Car name" className="input-name"/>
                <input type='color'/>'
                <button type="button" className="button-create">CREATE</button>
            </form>
               <form>
                <input type="text" placeholder="Car name" className="input-name"/>
                <input type='color'/>'
                <button type="button" className="button-update">UPDATE</button>
            </form>
            <button type="button">GENERATE</button>
        </div>
    </div>
    </>
    );
}