import { type JSX } from 'react';
import CarIcon from '../assets/racing-car-with-side-skirts-svgrepo-com.svg?react';
import type { Car, CarState } from '../types/models';

interface RaceTrackProps {
  car: Car;
  trackRef: (el: HTMLDivElement | null) => void;
  isMoving: boolean;
  state?: CarState;
  maxDistance: number;
}

export default function RaceTrack({
  car,
  trackRef,
  isMoving,
  state,
  maxDistance,
}: RaceTrackProps): JSX.Element {
  const duration = state?.duration ?? 3;
  const clampedDistance = Math.min(state?.distance ?? 0, maxDistance);

  return (
    <div className="track" ref={trackRef}>
      <div
        className="car-container"
        style={{
          transform: isMoving
            ? `translateX(${clampedDistance}px)`
            : 'translateX(0px)',
          transition: isMoving ? `transform ${duration}s linear` : 'none',
          width: '100px',
          height: '80px',
          position: 'absolute',
          left: 0,
        }}
      >
        <CarIcon
          style={{
            width: '100%',
            height: '100%',
            fill: car.color,
            marginLeft: '30px',
          }}
        />
      </div>

      <h3 style={{ color: car.color, marginTop: '100px' }}>{car.name}</h3>
    </div>
  );
}
