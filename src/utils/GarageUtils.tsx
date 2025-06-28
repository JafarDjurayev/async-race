import { fetchCars } from '../api/garage';
import { generate100RandomCars } from '../types/models';

export async function initGarage(): Promise<void> {
  try {
    const cars = await fetchCars();
    console.log('Fetched cars:', cars);

    const generated = await generate100RandomCars();
    console.log('Generated 100 cars:', generated);

    // optionally return cars or call setState/store functions here
  } catch (err) {
    console.error('Garage init failed:', err);
  }
}
