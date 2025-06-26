import React, { type JSX } from 'react';
import Controls from '../../components/Controls';
import Navigation from '../../components/Navigation';
import RaceLane from '../../components/RaceLane';
import Pagination from '../../components/Pagination';
import '../../styles/Garage.css';

export default function GaragePage(): JSX.Element {
  return (
    <>
      <Navigation />
      <div className="container">
        <Controls />
        <div className="race-lanes">
          <h1 className="race-title">START</h1>
          <RaceLane />
        </div>
        <Pagination />
      </div>
    </>
  );
}
