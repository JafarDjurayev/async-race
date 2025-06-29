import { create } from 'zustand';
import { type WinnerStore, type WinnersPaginationStore } from '../../types/models';



export const useWinnerStore = create<WinnerStore>((set) => ({
    winners: [],
    setWinners: (winners) => set({ winners }),
}));



export const useWinnersPaginationStore = create<WinnersPaginationStore>((set, get) => ({
    currentPage: 1,
    totalPages: 1,

    setCurrentPage: (page) => {
        const { totalPages } = get();
        const validPage = Math.min(Math.max(page, 1), totalPages);
        set({ currentPage: validPage });
    },

    setTotalPages: (total) => {
        const { currentPage } = get();
        const validTotal = Math.max(1, total);
        const validCurrent = Math.min(currentPage, validTotal);
        set({ totalPages: validTotal, currentPage: validCurrent });
    },
}));
