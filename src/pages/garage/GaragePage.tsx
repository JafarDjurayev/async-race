import React, { useEffect, type JSX } from 'react';
import Controls from '../../components/Controls';
import RaceLane from '../../components/RaceLane';
import Pagination from '../../components/Pagination';
import '../../styles/Garage.css';
import {
  useCarStore,
  usePaginationStore,
} from '../../app/zustand/useGarageStore';
// import { initGarage } from '../../utils/GarageUtils';

export default function GaragePage(): JSX.Element {
  const cars = useCarStore(state => state.cars);
  const currentPage = usePaginationStore(state => state.currentPage);
  const totalPages = usePaginationStore(state => state.totalPages);
  const setTotalPages = usePaginationStore(state => state.setTotalPages);
  const setCurrentPage = usePaginationStore(state => state.setCurrentPage);

  useEffect(() => {
    setTotalPages(Math.ceil(cars.length / 7));
  }, [cars]);

  //   useEffect(() => {
  //   void initGarage();
  // }, []);

  return (
    <>
      <div className="container">
        <Controls />
        <div className="race-lanes">
          <h1 className="race-title">START</h1>
          <RaceLane />
        </div>
        {cars.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
