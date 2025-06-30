import React, { useEffect, type JSX } from 'react';
import '../styles/RaceLane.css';
import CarIcon from '../assets/racing-car-with-side-skirts-svgrepo-com.svg?react';
import CarControlPanel from './CarControlPanel';
import { useCarStore } from '../app/zustand/useGarageStore';
import { usePaginationStore } from '../app/zustand/useGarageStore';


const CARS_PER_PAGE :number= 7;

// Add this useEffect to track store changes

export default function RaceLane() {
  const cars = useCarStore((state) => state.cars);
 ;

  console.log('Rendering cars:', cars);

  const currentPage = usePaginationStore((state) => state.currentPage);
  const setTotalPages = usePaginationStore((state) => state.setTotalPages);
  useEffect(() => {
    const pages = Math.ceil(cars.length / CARS_PER_PAGE);
    setTotalPages(pages);
  }, [cars, setTotalPages]);
 
  const startIndex = (currentPage - 1) * CARS_PER_PAGE;
  const currentCars = cars.slice(startIndex, startIndex + CARS_PER_PAGE);
  return (
    <>
      {currentCars.map((car) => (
        <div key={car.id} className="race-lane">
          <CarControlPanel key={car.id} carId={car.id}/>
          <div className="track">
            <div>
              <CarIcon style={{ width: '100px', height: '90px', fill: car.color }} aria-label="car" />
            </div>
            <h3 style={{ color: car.color }}>{car.name}</h3>
          </div>
        </div>
      ))}
    </>
  );
}

