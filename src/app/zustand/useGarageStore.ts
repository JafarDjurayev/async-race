import { create } from 'zustand';
import { type Car } from '../../types/models';
import { type PaginationStore } from '../../types/models';
import {type CarStore } from '../../types/models';

export const usePaginationStore = create<PaginationStore>((set, get) => ({
  currentPage: 1,
  totalPages: 1,
  setCurrentPage: (page) => {
    const { totalPages } = get();
    const validPage = Math.min(Math.max(page, 1), totalPages);
    set({ currentPage: validPage });
  },
  setTotalPages: (total) => {
    const { currentPage } = get();
    const validTotal = total < 1 ? 1 : total;
    const validCurrent = currentPage > validTotal ? validTotal : currentPage;
    set({ totalPages: validTotal, currentPage: validCurrent });
  },
}));



export const useCarStore = create<CarStore>((set) => ({
  cars: [],
  setCars: (cars) => set({ cars }),
  addCars: (newCars) =>
    set((state) => ({
      cars: [...state.cars, ...newCars],
    })),
}));