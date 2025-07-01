// src/hooks/useRaceHandlers.ts
import { useRaceStore } from '../app/zustand/useRaceStore';
import { useCarStore } from '../app/zustand/useGarageStore';
import { startEngine, driveEngine, stopEngine } from '../api/engine';

export function useRaceHandlers() {
  const cars = useCarStore(state => state.cars);
  const {
    startEngine: storeStartEngine,
    driveEngine: storeDriveEngine,
    stopEngine: storeStopEngine,
  } = useRaceStore();

  const handleRaceAll = async () => {
    try {
      const startPromises = cars.map(async car => {
        try {
          const { velocity, distance } = await startEngine(car.id);
          storeStartEngine(car.id, velocity, distance);
          await new Promise(r => setTimeout(r, 300));
          await driveEngine(car.id);
          storeDriveEngine(car.id);
        } catch (error) {
          console.error(`Start/Drive error for car ${car.id}:`, error);
          storeStopEngine(car.id);
        }
      });

      await Promise.all(startPromises);
    } catch (error) {
      console.error('Error racing all cars:', error);
    }
  };

  const handleResetAll = async () => {
    try {
      const stopPromises = cars.map(async car => {
        try {
          await stopEngine(car.id);
          storeStopEngine(car.id);
        } catch (error) {
          console.error(`Stop error for car ${car.id}:`, error);
        }
      });

      await Promise.all(stopPromises);
    } catch (error) {
      console.error('Error resetting all cars:', error);
    }
  };

  return { handleRaceAll, handleResetAll };
}
