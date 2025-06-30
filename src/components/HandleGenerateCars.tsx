import { usePaginationStore, useCarStore } from '../app/zustand/useGarageStore';
import { fetchCars } from '../api/garage';
import { generate100RandomCars } from '../utils/GarageUtils';
import { type GenerateCarsHook } from '../types/models';

export function useGenerateCars(): GenerateCarsHook {
  const setCars = useCarStore.getState().setCars;
  const setTotalPages = usePaginationStore.getState().setTotalPages;

  async function handleGenerateClick() {
    try {
      const existingCars = await fetchCars();

      const maxId = existingCars.reduce((max, car) => (car.id > max ? car.id : max), 0);

      const newCars = generate100RandomCars(maxId);
      const combinedCars = [...existingCars, ...newCars];
      setCars(combinedCars);
      setTotalPages(Math.ceil(combinedCars.length / 7));
    } catch (error) {
      console.error('Error generating cars:', error);
    }
  }
  return { handleGenerateClick };
}
