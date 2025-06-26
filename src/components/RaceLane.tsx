import React from 'react';
import '../styles/RaceLane.css';
import carIcon from '../assets/racing-car-with-side-skirts-svgrepo-com.svg';

export default function RaceLane() {
  return (
    <>
      <div className="race-lane">
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
            <button type="button" className="car-control-button">
              S
            </button>
            <br />
            <br />
            <button type="button" className="car-control-button">
              R
            </button>
          </div>
        </div>
        <div className="track">
          <div>
            <img
              src={carIcon}
              alt="car"
              style={{ width: '100px', height: '90px' }}
            />
          </div>
          <h3>BMW i5</h3>
        </div>
      </div>
    </>
  );
}
