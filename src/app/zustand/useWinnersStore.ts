// import { create } from 'zustand';
// import {
//   getWinners,
//   getWinnerById,
//   updateWinner,
//   createWinner,
//   getAllWinners
// } from '../../api/winners';
// import type { Winner } from '../../types/models';

// interface WinnerStore {
//   winners: Winner[];
//   totalCount: number;
//   loading: boolean;
//   error: string | null;
//   currentPage: number;
//   setWinners: (winners: Winner[]) => void;
//   setCurrentPage: (page: number) => void;
//   fetchWinners: (
//     page: number,
//     limit?: number,
//     sort?: 'id' | 'wins' | 'time',
//     order?: 'ASC' | 'DESC'
//   ) => Promise<number>;
//   fetchAllWinners: (
//     sort?: 'id' | 'wins' | 'time',
//     order?: 'ASC' | 'DESC'
//   ) => Promise<Winner[]>;
//   fetchWinnerById: (id: number) => Promise<Winner | null>;
//   updateWinnerRecord: (id: number, data: { wins: number; time: number }) => Promise<Winner>;
//   addWinner: (data: { id: number; wins: number; time: number }) => Promise<Winner>;
// }

// export const useWinnerStore = create<WinnerStore>((set) => ({
//   winners: [],
//   totalCount: 0,
//   loading: false,
//   error: null,
//   currentPage: 1,

//   setWinners: (winners) => set({ winners }),
  
//   setCurrentPage: (page) => set({ currentPage: page }),

//   fetchWinners: async (page, limit = 10, sort = 'id', order = 'ASC') => {
//     set({ loading: true, error: null });
//     try {
//       const { winners, totalCount } = await getWinners(page, limit, sort, order);
//       set({ 
//         winners,
//         totalCount,
//         currentPage: page,
//         loading: false 
//       });
//       return totalCount;
//     } catch (error) {
//       set({ 
//         error: error instanceof Error ? error.message : 'Failed to fetch winners',
//         loading: false 
//       });
//       throw error;
//     }
//   },

//   fetchAllWinners: async (sort = 'id', order = 'ASC') => {
//     set({ loading: true, error: null });
//     try {
//       const { winners, totalCount } = await getAllWinners(sort, order);
//       set({ 
//         winners,
//         totalCount,
//         loading: false 
//       });
//       return winners;
//     } catch (error) {
//       set({
//         error: error instanceof Error ? error.message : 'Failed to fetch all winners',
//         loading: false
//       });
//       throw error;
//     }
//   },
  
//   fetchWinnerById: async (id) => {
//     try {
//       return await getWinnerById(id);
//     } catch (error) {
//       set({ 
//         error: error instanceof Error ? error.message : 'Failed to fetch winner' 
//       });
//       throw error;
//     }
//   },
  
//   updateWinnerRecord: async (id, data) => {
//     set({ loading: true });
//     try {
//       const updatedWinner = await updateWinner(id, data);
//       set((state) => ({
//         winners: state.winners.map(winner => 
//           winner.id === id ? updatedWinner : winner
//         ),
//         loading: false
//       }));
//       return updatedWinner;
//     } catch (error) {
//       set({ 
//         error: error instanceof Error ? error.message : 'Failed to update winner',
//         loading: false 
//       });
//       throw error;
//     }
//   },
  
//   addWinner: async (data) => {
//     set({ loading: true });
//     try {
//       const newWinner = await createWinner(data);
//       set((state) => ({
//         winners: [...state.winners, newWinner],
//         totalCount: state.totalCount + 1,
//         loading: false
//       }));
//       return newWinner;
//     } catch (error) {
//       set({ 
//         error: error instanceof Error ? error.message : 'Failed to create winner',
//         loading: false 
//       });
//       throw error;
//     }
//   }
// }));

import { create } from 'zustand';
import {
  getWinners,
  getWinnerById,
  updateWinner,
  createWinner,
  getAllWinners
} from '../../api/winners';
import type { Winner } from '../../types/models';

interface WinnerStore {
  winners: Winner[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  setWinners: (winners: Winner[]) => void;
  setCurrentPage: (page: number) => void;
  fetchWinners: (
    page: number,
    limit?: number,
    sort?: 'id' | 'wins' | 'time',
    order?: 'ASC' | 'DESC'
  ) => Promise<number>;
  fetchAllWinners: (
    sort?: 'id' | 'wins' | 'time',
    order?: 'ASC' | 'DESC'
  ) => Promise<Winner[]>;
  fetchWinnerById: (id: number) => Promise<Winner | null>;
  updateWinnerRecord: (id: number, data: Omit<Winner, 'id'>) => Promise<Winner>;
  addWinner: (data: Omit<Winner, 'wins'> | Winner) => Promise<Winner>;
}

export const useWinnerStore = create<WinnerStore>((set) => ({
  winners: [],
  totalCount: 0,
  loading: false,
  error: null,
  currentPage: 1,

  setWinners: (winners) => set({ winners }),
  
  setCurrentPage: (page) => set({ currentPage: page }),

  fetchWinners: async (page, limit = 10, sort = 'id', order = 'ASC') => {
    set({ loading: true, error: null });
    try {
      const { winners, totalCount } = await getWinners(page, limit, sort, order);
      set({ 
        winners,
        totalCount,
        currentPage: page,
        loading: false 
      });
      return totalCount;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch winners',
        loading: false 
      });
      throw error;
    }
  },

  fetchAllWinners: async (sort = 'id', order = 'ASC') => {
    set({ loading: true, error: null });
    try {
      const { winners, totalCount } = await getAllWinners(sort, order);
      set({ 
        winners,
        totalCount,
        loading: false 
      });
      return winners;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch all winners',
        loading: false
      });
      throw error;
    }
  },
  
  fetchWinnerById: async (id) => {
    try {
      return await getWinnerById(id);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch winner' 
      });
      throw error;
    }
  },
  
  updateWinnerRecord: async (id, data) => {
    set({ loading: true });
    try {
      const updatedWinner = await updateWinner(id, data);
      set((state) => ({
        winners: state.winners.map(winner => 
          winner.id === id ? updatedWinner : winner
        ),
        loading: false
      }));
      return updatedWinner;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update winner',
        loading: false 
      });
      throw error;
    }
  },
  
  addWinner: async (data) => {
    set({ loading: true });
    try {
      // Ensure we have default wins if not provided
      const winnerData = 'wins' in data ? data : { ...data, wins: 1 };
      const newWinner = await createWinner(winnerData);
      set((state) => ({
        winners: [...state.winners, newWinner],
        totalCount: state.totalCount + 1,
        loading: false
      }));
      return newWinner;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create winner',
        loading: false 
      });
      throw error;
    }
  }
}));