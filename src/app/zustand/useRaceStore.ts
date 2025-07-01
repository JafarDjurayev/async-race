// import { create } from 'zustand';

// type CarAnimationState = {
//   isDriving: boolean;
//   velocity: number;
//   distance: number;
//   duration: number; 
// };


// type RaceState = {
//   carStates: Record<number, CarAnimationState>;
//   initializeCar: (id: number) => void;
//   startEngine: (id: number, velocity: number, distance: number) => void;
//   driveEngine: (id: number) => void;
//   stopEngine: (id: number) => void;
//   resetCar: (id: number) => void;
// };

// export const useRaceStore = create<RaceState>((set) => ({
//   carStates: {},
  
//   initializeCar: (id) => {
//     set((state) => ({
//       carStates: {
//         ...state.carStates,
//         [id]: { 
//           isDriving: false, 
//           velocity: 0, 
//           distance: 0, 
//           duration: 3 
//         }
//       }
//     }));
//   },

//   startEngine: (id, velocity, distance) => {
//     const duration = distance / velocity / 1000; 
//     set((state) => ({
//       carStates: {
//         ...state.carStates,
//         [id]: {
//           ...state.carStates[id],
//           velocity,
//           distance,
//           duration,
//           isDriving: false
//         }
//       }
//     }));
//     return duration;
//   },

//   driveEngine: (id) => {
//     set((state) => {
//       const car = state.carStates[id];
//       if (!car) return state;
      
//       return {
//         carStates: {
//           ...state.carStates,
//           [id]: {
//             ...car,
//             isDriving: true
//           }
//         }
//       };
//     });
//   },

//   stopEngine: (id) => {
//     set((state) => ({
//       carStates: {
//         ...state.carStates,
//         [id]: {
//           ...state.carStates[id],
//           isDriving: false
//         }
//       }
//     }));
//   },

//   resetCar: (id) => {
//     set((state) => {
//       const newStates = { ...state.carStates };
//       delete newStates[id];
//       return { carStates: newStates };
//     });
//   }
// }));


import { create } from 'zustand';
import type { Winner } from '../../types/models';

type CarAnimationState = {
  isDriving: boolean;
  velocity: number;
  distance: number;
  duration: number; 
};

export type RaceStatus = 'ready' | 'racing' | 'finished' | 'reset';

export interface RaceState {
  carStates: Record<number, CarAnimationState>;
  raceStatus: RaceStatus;
  currentWinner: Winner | null;
  initializeCar: (id: number) => void;
  startEngine: (id: number, velocity: number, distance: number) => void;
  driveEngine: (id: number) => void;
  stopEngine: (id: number) => void;
  resetCar: (id: number) => void;
  setRaceStatus: (status: RaceStatus) => void;
  setWinner: (winner: Winner | null) => void;
}

export const useRaceStore = create<RaceState>((set) => ({
  carStates: {},
  raceStatus: 'ready',
  currentWinner: null,
  
  initializeCar: (id) => {
    set((state) => ({
      carStates: {
        ...state.carStates,
        [id]: { 
          isDriving: false, 
          velocity: 0, 
          distance: 0, 
          duration: 3 
        }
      }
    }));
  },

  startEngine: (id, velocity, distance) => {
    const duration = distance / velocity / 1000; 
    set((state) => ({
      carStates: {
        ...state.carStates,
        [id]: {
          ...state.carStates[id],
          velocity,
          distance,
          duration,
          isDriving: false
        }
      }
    }));
    return duration;
  },

  driveEngine: (id) => {
    set((state) => {
      const car = state.carStates[id];
      if (!car) return state;
      
      return {
        carStates: {
          ...state.carStates,
          [id]: {
            ...car,
            isDriving: true
          }
        }
      };
    });
  },

  stopEngine: (id) => {
    set((state) => ({
      carStates: {
        ...state.carStates,
        [id]: {
          ...state.carStates[id],
          isDriving: false
        }
      }
    }));
  },

  resetCar: (id) => {
    set((state) => {
      const newStates = { ...state.carStates };
      delete newStates[id];
      return { carStates: newStates };
    });
  },

  setRaceStatus: (status) => set({ raceStatus: status }),
  
  setWinner: (winner) => set({ currentWinner: winner })
}));