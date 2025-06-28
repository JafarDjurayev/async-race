import { fetchCars } from '../api/garage';
import { brands } from '../types/models';
import { models } from '../types/models';
import { type Car } from '../types/models';


function getRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function getRandomName(): string {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${brand} ${model}`;
}

export async function generate100RandomCars(): Promise<Car[]> {
  // 1. Fetch existing cars
  const existingCars = await fetchCars();

  // 2. Find max ID in existing cars
  const maxId = existingCars.reduce((max, car) => (car.id > max ? car.id : max), 0);

  // 3. Generate 100 new cars with IDs starting from maxId + 1
  const newCars: Car[] = Array.from({ length: 100 }, (_, i) => ({
    id: maxId + 1 + i,
    name: getRandomName(),
    color: getRandomColor(),
  }));

  return newCars;
}


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
