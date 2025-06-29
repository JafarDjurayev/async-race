import React, {type JSX} from "react";
import '../styles/CarControlPanel.css';

export default function CarControlPanel(): JSX.Element{
    return(<>
    <div className="car-control-panel">
            <div>
              <button type="button" className="car-select-button">
                SELECT
              </button>
              <br />
              <br />
              <button type="button" className="car-remove-button">
                REMOVE
              </button>
            </div>
            <div>
              <button type="button" className="car-control-button">S</button>
              <br />
              <br />
              <button type="button" className="car-control-button">R</button>
            </div>
          </div>
    </>)
}