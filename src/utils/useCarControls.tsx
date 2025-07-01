import { useCarStore, useCarUpdateStore } from '../app/zustand/useGarageStore';
import { startEngine, driveEngine, stopEngine } from '../api/engine';
import { useRaceStore } from '../app/zustand/useRaceStore';
import { handleRemoveCar } from '../utils/GarageUtils';
import { useCallback } from 'react';

export function useCarControls(carId: number) {
  const {
    startEngine: storeStartEngine,
    driveEngine: storeDriveEngine,
    stopEngine: storeStopEngine,
  } = useRaceStore();
  const cars = useCarStore(state => state.cars);
  const setSelectedCar = useCarUpdateStore(state => state.setSelectedCar);

  const handleStartDrive = useCallback(async () => {
    try {
      const { velocity, distance } = await startEngine(carId);
      storeStartEngine(carId, velocity, distance);
      await new Promise(r => setTimeout(r, 300));
      await driveEngine(carId);
      storeDriveEngine(carId);
    } catch (err) {
      console.error(`Start error for car ${carId}`, err);
      storeStopEngine(carId);
    }
  }, [carId]);

  const handleStop = useCallback(async () => {
    try {
      await stopEngine(carId);
      storeStopEngine(carId);
    } catch (err) {
      console.error(`Stop error for car ${carId}`, err);
    }
  }, [carId]);

  const handleSelect = useCallback(() => {
    const selected = cars.find(c => c.id === carId);
    if (selected) {
      setSelectedCar(selected);
      console.log('Selected car:', selected);
    }
  }, [carId, cars]);

  const handleRemove = useCallback(() => {
    void handleRemoveCar(carId);
    storeStopEngine(carId);
  }, [carId]);

  return { handleStartDrive, handleStop, handleSelect, handleRemove };
}
