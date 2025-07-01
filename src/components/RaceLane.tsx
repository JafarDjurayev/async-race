import { type JSX } from 'react';
import '../styles/RaceLane.css';
import CarControlPanel from './CarControlPanel';
import { useRaceLaneLogic } from '../utils/useCarAnimation';
import RaceTrack from './RaceTrack';

export default function RaceLane(): JSX.Element {
  const { currentCars, carStates, drivingCars, maxDistances, trackRefs } =
    useRaceLaneLogic();

  return (
    <div className="race-lanes-container">
      {currentCars.map(car => (
        <div key={car.id} className="race-lane">
          <CarControlPanel carId={car.id} />
          <RaceTrack
            car={car}
            trackRef={el => (trackRefs.current[car.id] = el)}
            isMoving={drivingCars[car.id]}
            state={carStates[car.id]}
            maxDistance={maxDistances[car.id] ?? 0}
          />
        </div>
      ))}
    </div>
  );
}
