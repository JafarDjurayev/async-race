import React from 'react';
import Controls from '../../components/Controls';
import Navigation from '../../components/Navigation';
import RaceLane from '../../components/RaceLane';
import '../../styles/Garage.css';

export default function GaragePage() {
  return (
    <>
      <Navigation />
      <div className="container">
        <Controls />
        <div className="race-lanes">
          <h1 className="race-title">START</h1>
          <RaceLane />
        </div>
      </div>
    </>
  );
}
