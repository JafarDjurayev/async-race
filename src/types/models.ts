
export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface Winners {
  id: number;
  wins: number;
  time: number;
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
  setCars: (cars: Car[]) => void;
  addCars: (newCars: Car[]) => void;
}


export const brands: string[] = ['Tesla', 'Ford', 'Toyota', 'BMW', 'Audi', 'Chevy', 'Honda', 'Nissan', 'Mazda', 'Mercedes']
export const models: string[] = ['Model S', 'Mustang', 'Corolla', '3 Series', 'A4', 'Camaro', 'Civic', 'Altima', 'CX-5', 'C-Class'];

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export type EngineStatus = 'started' | 'stopped' | 'drive';
