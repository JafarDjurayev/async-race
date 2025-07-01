import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchCars } from '../api/garage';
import { useCarStore, usePaginationStore } from '../app/zustand/useGarageStore';
import { useRaceStore } from '../app/zustand/useRaceStore';

const CARS_PER_PAGE = 7;
const CAR_WIDTH = 100;

export function useRaceLaneLogic() {
  const { cars, setCars } = useCarStore();
  const currentPage = usePaginationStore(state => state.currentPage);
  const setTotalPages = usePaginationStore(state => state.setTotalPages);
  const carStates = useRaceStore(state => state.carStates);
  const [drivingCars, setDrivingCars] = useState<Record<number, boolean>>({});
  const trackRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [maxDistances, setMaxDistances] = useState<Record<number, number>>({});

  useEffect(() => {
    (async () => {
      try {
        const loadedCars = await fetchCars();
        setCars(loadedCars);
      } catch {
        setCars([]);
      }
    })();
  }, [setCars]);

  const currentCars = useMemo(() => {
    if (!Array.isArray(cars)) return [];
    const startIndex = (currentPage - 1) * CARS_PER_PAGE;
    return cars.slice(startIndex, startIndex + CARS_PER_PAGE);
  }, [cars, currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(cars.length / CARS_PER_PAGE));
  }, [cars, setTotalPages]);

  useEffect(() => {
    const distances: Record<number, number> = {};
    currentCars.forEach(car => {
      const trackElement = trackRefs.current[car.id];
      if (trackElement) {
        const maxDistance = Math.max(trackElement.clientWidth - CAR_WIDTH, 0);
        distances[car.id] = maxDistance;
      }
    });
    setMaxDistances(distances);
  }, [currentCars]);

  useEffect(() => {
    currentCars.forEach(car => {
      const state = carStates[car.id];
      setDrivingCars(prev => ({
        ...prev,
        [car.id]: state?.isDriving || false,
      }));
    });
  }, [carStates, currentCars]);

  return {
    currentCars,
    carStates,
    drivingCars,
    maxDistances,
    trackRefs,
  };
}
