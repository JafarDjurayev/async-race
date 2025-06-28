
import { type Car } from "../types/models";

const BASE_URL:string = 'http://127.0.0.1:3000';

export async function fetchCars(): Promise<Car[]> {
  const response = await fetch(`${BASE_URL}/garage`);
  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }
  const cars: Car[] = await response.json();
  return cars;
}

fetchCars()
  .then(cars => {
    console.log('Fetched cars:', cars);
  })
  .catch(err => {
    console.error('Error fetching cars:', err);
  });