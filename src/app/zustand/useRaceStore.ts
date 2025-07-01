// import { create } from 'zustand';

// type CarAnimationState = {
//   [carId: number]: {
//     isDriving: boolean;
//     velocity: number;
//     distance: number;
//     animationDuration: number;
//   };
// };

// type RaceState = {
//   carStates: CarAnimationState;
//   setCarStarted: (id: number, velocity: number, distance: number) => void;
//   setCarDriving: (id: number) => void;
//   resetCar: (id: number) => void;
// };

// export const useRaceStore = create<RaceState>((set) => ({
//   carStates: {},
//   setCarStarted: (id, velocity, distance) => {
//     const animationDuration = distance / velocity / 1000; // ms to s
//     set((state) => ({
//       carStates: {
//         ...state.carStates,
//         [id]: { isDriving: false, velocity, distance, animationDuration },
//       },
//     }));
//   },
//   setCarDriving: (id) => {
//     set((state) => {
//       const existing = state.carStates[id];
//       if (!existing) return state;
//       return {
//         carStates: {
//           ...state.carStates,
//           [id]: { ...existing, isDriving: true },
//         },
//       };
//     });
//   },
//   resetCar: (id) =>
//     set((state) => {
//       const newStates = { ...state.carStates };
//       delete newStates[id];
//       return { carStates: newStates };
//     }),
// }));

// type CarAnimationStates = {
//   [carId: number]: { isDriving: boolean; duration: number };
// };

// export const useAnimationStore = create<{
//   animationStates: CarAnimationStates;
//   setDriving: (carId: number, isDriving: boolean, duration?: number) => void;
//   resetAll: () => void;
// }>((set) => ({
//   animationStates: {},
//   setDriving: (carId, isDriving, duration = 3) =>
//     set((state) => ({
//       animationStates: {
//         ...state.animationStates,
//         [carId]: { isDriving, duration },
//       },
//     })),
//   resetAll: () => set({ animationStates: {} }),
// }));

// useRaceStore.ts
import { create } from 'zustand';

type CarAnimationState = {
  isDriving: boolean;
  velocity: number;
  distance: number;
  duration: number; // in seconds
};

type RaceState = {
  carStates: Record<number, CarAnimationState>;
  initializeCar: (id: number) => void;
  startEngine: (id: number, velocity: number, distance: number) => void;
  driveEngine: (id: number) => void;
  stopEngine: (id: number) => void;
  resetCar: (id: number) => void;
};

export const useRaceStore = create<RaceState>(set => ({
  carStates: {},

  initializeCar: id => {
    set(state => ({
      carStates: {
        ...state.carStates,
        [id]: {
          isDriving: false,
          velocity: 0,
          distance: 0,
          duration: 3, // Default fallback
        },
      },
    }));
  },

  startEngine: (id, velocity, distance) => {
    const duration = distance / velocity / 1000; // Convert to seconds
    set(state => ({
      carStates: {
        ...state.carStates,
        [id]: {
          ...state.carStates[id],
          velocity,
          distance,
          duration,
          isDriving: false, // Not driving yet
        },
      },
    }));
    return duration;
  },

  driveEngine: id => {
    set(state => {
      const car = state.carStates[id];
      if (!car) return state;

      return {
        carStates: {
          ...state.carStates,
          [id]: {
            ...car,
            isDriving: true,
          },
        },
      };
    });
  },

  stopEngine: id => {
    set(state => ({
      carStates: {
        ...state.carStates,
        [id]: {
          ...state.carStates[id],
          isDriving: false,
        },
      },
    }));
  },

  resetCar: id => {
    set(state => {
      const newStates = { ...state.carStates };
      delete newStates[id];
      return { carStates: newStates };
    });
  },
}));
