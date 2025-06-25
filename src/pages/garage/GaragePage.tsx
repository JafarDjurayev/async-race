import React from 'react';
import Controls from '../../components/Controls';
import Navigation from '../../components/Navigation';
import carIcon from '../../assets/racing-car-with-side-skirts-svgrepo-com.svg';
import '../../styles/Garage.css';

export default function GaragePage() {
  return (
    <>
      <Navigation />
      <div className="container">
        <Controls />
        <div className="race-lanes">
          <h1 className="race-title">START</h1>
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
        </div>
      </div>
    </>
  );
}
