// import { usePaginationStore, useCarStore } from '../app/zustand/useGarageStore';
// import { CreateCar, fetchCars } from '../api/garage';
// import { generate100RandomCars } from '../utils/GarageUtils';
// import { type GenerateCarsHook } from '../types/models';

// export function useGenerateCars(): GenerateCarsHook {
//   const { cars, setCars } = useCarStore();
//   const { setTotalPages } = usePaginationStore();

//   async function handleGenerateClick() {
//     try {
//       // 1. Generate temp cars with client-side IDs
//       const startingId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;
//         const tempCars = generate100RandomCars(startingId).map(car => ({
//         ...car,
//         id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
//         isTemp: true,
//         isFailed: false
//       }));

//       // 2. Optimistic update
//       setCars([...cars, ...tempCars]);

//       // 3. Create cars with enhanced error handling
//       const BATCH_SIZE = 5;
//       const creationPromises = [];

//       for (let i = 0; i < tempCars.length; i += BATCH_SIZE) {
//         const batch = tempCars.slice(i, i + BATCH_SIZE);
//         creationPromises.push(
//           Promise.all(
//             batch.map(tempCar =>
//               CreateCar({
//                 name: tempCar.name,
//                 color: tempCar.color
//               }).catch(error => {
//                 console.error(`Failed to create car ${tempCar.name}:`, error);
//                 return null;
//               })
//             )
//           )
//         );
//       }

//       // 4. Wait for all batches to complete
//       await Promise.all(creationPromises);

//       // 5. Refresh the complete car list from server
//       const updatedCars = await fetchCars();

//       // 6. Final state update
//       setCars(updatedCars);
//       setTotalPages(Math.ceil(updatedCars.length / 7));

//       // 7. Remove any remaining temp cars (shouldn't be needed but just in case)
//       setTimeout(() => {
//         setCars(prev => prev.filter(c => !c.isTemp));
//       }, 1000);

//     } catch (error) {
//       console.error('Error in car generation process:', error);
//       // Rollback any remaining temp cars
//       setCars(prev => prev.filter(c => !c.isTemp));
//     }
//   }

//   return { handleGenerateClick };
// }

import { usePaginationStore, useCarStore } from '../app/zustand/useGarageStore';
import { CreateCar, fetchCars } from '../api/garage';
import { generate100RandomCars } from '../utils/GarageUtils';
import { type Car, type GenerateCarsHook } from '../types/models';

// Extend Car type for temp flags
type TempCar = Car & { isTemp?: boolean; isFailed?: boolean };

export function useGenerateCars(): GenerateCarsHook {
  const { cars, setCars } = useCarStore();
  const { setTotalPages } = usePaginationStore();

  async function handleGenerateClick(): Promise<void> {
    try {
      // 1. Define starting ID for fresh generation
      const startingId =
        cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;

      // 2. Generate and mark as temp
      const tempCars: TempCar[] = generate100RandomCars(startingId).map(
        car => ({
          ...car,
          isTemp: true,
          isFailed: false,
        }),
      );

      // 3. Optimistic UI update
      setCars([...cars, ...tempCars]);

      // 4. Send in batches
      const BATCH_SIZE = 5;
      const creationTasks: Promise<(Car | null)[]>[] = [];

      for (let i = 0; i < tempCars.length; i += BATCH_SIZE) {
        const batch = tempCars.slice(i, i + BATCH_SIZE);
        creationTasks.push(
          Promise.all(
            batch.map(tempCar =>
              CreateCar({ name: tempCar.name, color: tempCar.color }).catch(
                error => {
                  console.error(`Failed to create car ${tempCar.name}:`, error);
                  return null;
                },
              ),
            ),
          ),
        );
      }

      await Promise.all(creationTasks);

      // 5. Refresh state from server
      const updatedCars = await fetchCars();
      setCars(updatedCars);
      setTotalPages(Math.ceil(updatedCars.length / 7));

      // 6. Remove temp entries defensively
      setTimeout(() => {
        const currentCars = useCarStore.getState().cars;
        const filtered = currentCars.filter((c: TempCar) => !c.isTemp);
        setCars(filtered);
      }, 1000);
    } catch (error) {
      console.error('Error during car generation:', error);
      const currentCars = useCarStore.getState().cars;
      const filtered = currentCars.filter((c: TempCar) => !c.isTemp);
      setCars(filtered);
    }
  }

  return { handleGenerateClick };
}
