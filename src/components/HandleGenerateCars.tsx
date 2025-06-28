import React, { type JSX } from 'react';
import { usePaginationStore } from '../app/zustand/useGarageStore';
import { useCarStore } from '../app/zustand/useGarageStore';
import { generate100RandomCars } from '../utils/GarageUtils';
import {type GenerateCarsHook } from '../types/models';


export function useGenerateCars(): GenerateCarsHook {
  const cars = useCarStore((state) => state.cars);
  const addCars = useCarStore((state) => state.addCars);

  async function handleGenerateClick() {
    const existingIds = new Set(cars.map((car) => car.id));
    const newCars = await generate100RandomCars(existingIds);
    addCars(newCars);

    const setTotalPages = usePaginationStore.getState().setTotalPages;
    const allCarsCount = cars.length + newCars.length;
    setTotalPages(Math.ceil(allCarsCount / 7));
  }

  return { handleGenerateClick };
}