export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface CarCreate {
  name: string;
  color: string;
}

export interface Winners {
  id: number;
  wins: number;
  time: number;
}

export interface CarState {
  isDriving: boolean;
  duration: number;
  velocity: number;
  distance: number;
}

export type GenerateCarsHook = {
  handleGenerateClick: () => Promise<void>;
};

export interface PaginationStore {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
}

export interface Winner {
  id: number;
  name: string;
  wins: number;
  time: number;
}

export interface WinnerStore {
  winners: Winner[];
  setWinners: (winners: Winner[]) => void;
}

export interface WinnersPaginationStore {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
}

export interface CarStore {
  cars: Car[];
  carNameInput: string;
  carColorInput: string;

  setCars: (cars: Car[]) => void;
  addCars: (newCars: Car[]) => void;
  removeCar: (id: number) => void;
  updateCar: (car: Car) => void;

  setCarNameInput: (name: string) => void;
  setCarColorInput: (color: string) => void;
}

export interface CarCreateStore {
  cars: Car[];
  carNameInput: string;
  carColorInput: string;
  setCarNameInput: (name: string) => void;
  setCarColorInput: (color: string) => void;
  addCars: (newCars: Car[]) => void;
  addCar: (car: Car) => void;
  createCar: () => Promise<void>;
}

export const brands: string[] = [
  'Tesla',
  'Ford',
  'Toyota',
  'BMW',
  'Audi',
  'Chevy',
  'Honda',
  'Nissan',
  'Mazda',
  'Mercedes',
];
export const models: string[] = [
  'Model S',
  'Mustang',
  'Corolla',
  '3 Series',
  'A4',
  'Camaro',
  'Civic',
  'Altima',
  'CX-5',
  'C-Class',
];

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export type EngineStatus = 'started' | 'stopped' | 'drive';

export interface EngineStartResponse {
  velocity: number;
  distance: number;
}
export type EngineError = 'broken' | 'in-progress' | 'not-found';

export interface EngineDriveResponse {
  success: boolean;
}

export interface CarControlPanelProps {
  carId: number;
}

export interface CarUpdateStore {
  selectedCar: Car | null;
  setSelectedCar: (car: Car) => void;
  clearSelectedCar: () => void;
}
