import { create } from 'zustand';
import { type PaginationStore, type CarCreateStore, type CarStore, type CarUpdateStore, type Car } from '../../types/models';
import { CreateCar } from '../../api/garage';

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



export const CreateCarStore = create<CarCreateStore>((set, get) => ({
  cars: [],
  carNameInput: '',
  carColorInput: '#000000',


  setCarInputs: (name: string, color: string) => set({
    carNameInput: name,
    carColorInput: color
  }),

  setCarNameInput: (name) => set({ carNameInput: name }),
  setCarColorInput: (color) => set({ carColorInput: color }),

  addCars: (newCars) => set((state) => ({ cars: [...state.cars, ...newCars] })),
  addCar: (car) => set((state) => ({ cars: [...state.cars, car] })),

  createCar: async () => {
    const { carNameInput, carColorInput, addCar, setCarNameInput, setCarColorInput } = get();
    if (!carNameInput.trim()) return;

    const newCar = await CreateCar({ name: carNameInput, color: carColorInput });
    addCar(newCar);

    setCarNameInput('');
    setCarColorInput('#000000');
  },
}));


export const useCarStore = create<CarStore>((set, get) => ({
  cars: [],
  carNameInput: '',
  carColorInput: '#000000',

  // Add/Remove/Update Cars
  setCars: (cars) => set({ cars }),

  addCars: (newCars) =>
    set((state) => ({
      cars: [...state.cars, ...newCars],
    })),

  removeCar: (id: number) =>
    set((state) => ({
      cars: state.cars.filter((car) => car.id !== id),
    })),

// updateCar: (updatedCar) => set((state) => {
//   console.log('Before update - cars:', state.cars);
//   console.log('Applying update:', updatedCar);
//   const newCars = state.cars.map((car) => 
//     car.id === updatedCar.id ? updatedCar : car
//   );
//   console.log('After update - cars:', newCars);
//   return { cars: newCars };
// }),

updateCar: (updatedCar) => set((state) => {
  console.group('[Store] Updating Car');
  
  // 1. Validate input
  if (!updatedCar?.id) {
    console.error('Invalid update - missing car ID');
    return state;
  }

  // 2. Find current car state
  const currentCar = state.cars.find(c => c.id === updatedCar.id);
  if (!currentCar) {
    console.error('Car not found in store:', updatedCar.id);
    return state;
  }

  // 3. Deep compare changes
  const changes = {
    name: currentCar.name !== updatedCar.name,
    color: currentCar.color !== updatedCar.color,
    // Add other properties as needed
  };


  console.log('Update details:', {
    current: currentCar,
    incoming: updatedCar,
    changes
  });

  // 4. Only update if changes exist
  if (!Object.values(changes).some(Boolean)) {
    console.warn('No changes detected - skipping update');
    return state;
  }

  // 5. Perform update
  const newCars = state.cars.map(car => 
    car.id === updatedCar.id 
      ? { ...car, ...updatedCar } // Merge properties
      : car
  );

  console.log('Update result:', {
    before: currentCar,
    after: newCars.find(c => c.id === updatedCar.id)
  });

  console.groupEnd();
  return { cars: newCars };
}),


  // Input handling for name/color
  setCarNameInput: (name) => set({ carNameInput: name }),
  setCarColorInput: (color) => set({ carColorInput: color }),
}));
 

export const useCarUpdateStore = create<CarUpdateStore>((set) => ({
  selectedCar: null,
  setSelectedCar: (car) => set({ selectedCar: car }),
  clearSelectedCar: () => set({ selectedCar: null }),
}));










