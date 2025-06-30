
import { type Car, type CarCreate } from "../types/models";

const BASE_URL:string = 'http://127.0.0.1:3000';

// export async function fetchCars(): Promise<Car[]> {
//   const response = await fetch(`${BASE_URL}/garage`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch cars');
//   }
//   const cars: Car[] = await response.json();
//   return cars;
// }

export async function fetchCars(): Promise<Car[]> {
  const response = await fetch(`${BASE_URL}/garage`, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }

  const cars: Car[] = await response.json();
  return cars;
}



export async function CreateCar(car: CarCreate): Promise<Car> {
  const response = await fetch(`${BASE_URL}/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    throw new Error('Failed to create car');
  }

  const createdCar: Car = await response.json();
  return createdCar;
}


export async function UpdateCar(car: Car): Promise<Car> {
  const response = await fetch(`${BASE_URL}/garage/${car.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: car.name,
      color: car.color,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update car with id ${car.id}`);
  }

  const updatedCar: Car = await response.json();
  return updatedCar;
}


export async function DeleteCar(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete car with id ${id}`);
  }
}


fetchCars()
  .then(cars => {
    console.log('Fetched cars:', cars);
  })
  .catch(err => {
    console.error('Error fetching cars:', err);
  });

