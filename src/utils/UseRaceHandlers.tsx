// import { useRaceStore } from '../app/zustand/useRaceStore';
// import { useCarStore } from '../app/zustand/useGarageStore';
// import { startEngine, driveEngine, stopEngine } from '../api/engine';
// import { useWinnerStore } from '../app/zustand/useWinnersStore';
// import { getAllWinners } from '../api/winners';


// export function useRaceHandlers() {
//   const cars = useCarStore(state => state.cars);
//   const {
//     startEngine: storeStartEngine,
//     driveEngine: storeDriveEngine,
//     stopEngine: storeStopEngine,
//     setRaceStatus,
//     setWinner
//   } = useRaceStore();

//   const handleRaceAll = async () => {
//     console.log('[handleRaceAll] Starting race with cars:', cars.length);
//     try {
//       setRaceStatus('racing');
//       setWinner(null);
//       console.log('[handleRaceAll] Race status set to racing');

//       const raceResults = await Promise.all(
//         cars.map(async car => {
//           try {
//             // Start engine
//             const { velocity, distance } = await startEngine(car.id);
//             storeStartEngine(car.id, velocity, distance);
            
//             // Calculate duration and start driving
//             const duration = distance / velocity / 1000;
//             const driveSuccess = await driveEngine(car.id);
            
//             if (!driveSuccess) {
//               throw new Error('Engine failure');
//             }

//             // Wait for car to reach finish line
//             await new Promise(resolve => setTimeout(resolve, duration * 1000));
            
//             // Stop engine when finished
//             await stopEngine(car.id);
//             storeStopEngine(car.id);
            
//             return {
//               id: car.id,
//               time: parseFloat(duration.toFixed(2)),
//               success: true
//             };
//           } catch (error) {
//             console.error(`[handleRaceAll] Error for car ${car.id}:`, error);
//             try {
//               await stopEngine(car.id);
//               storeStopEngine(car.id);
//             } catch (stopError) {
//               console.error(`[handleRaceAll] Error stopping car ${car.id}:`, stopError);
//             }
//             return {
//               id: car.id,
//               success: false
//             };
//           }
//         })
//       );

//       // Process successful finishers
//       const successfulCars = raceResults
//         .filter(result => result.success)
//         .map(result => ({ id: result.id!, time: result.time! }));

//       if (successfulCars.length > 0) {
//         // Determine winner (lowest time)
//         const winner = successfulCars.reduce((prev, current) => 
//           prev.time < current.time ? prev : current
//         );

//         console.log('[handleRaceAll] Race winner:', winner);
//         setWinner({ id: winner.id, wins: 1, time: winner.time });

//         // Update winners table
//         try {
//           const { addWinner, fetchWinners } = useWinnerStore.getState();
          
//           // Add new winner
//           await addWinner({ 
//             id: winner.id, 
//             wins: 1, 
//             time: winner.time 
//           });
          
//           // Refresh winners list - fetch ALL winners first
//           const { winners: allWinners, totalCount } = await getAllWinners();
//           useWinnerStore.getState().setWinners(allWinners);
          
//           // Then fetch current page to update pagination
//           const { currentPage } = useWinnerStore.getState();
//           await fetchWinners(currentPage, 10);
          
//         } catch (error) {
//           console.error('[handleRaceAll] Error updating winners:', error);
//         }
//       }

//       setRaceStatus('finished');
//       console.log('[handleRaceAll] Race completed');
//     } catch (error) {
//       console.error('[handleRaceAll] Race error:', error);
//       setRaceStatus('ready');
//     }
//   };

//   const handleResetAll = async () => {
//     console.log('[handleResetAll] Resetting all cars');
//     try {
//       // Stop all cars
//       await Promise.all(
//         cars.map(async car => {
//           try {
//             await stopEngine(car.id);
//             storeStopEngine(car.id);
//           } catch (error) {
//             console.error(`[handleResetAll] Stop error for car ${car.id}:`, error);
//           }
//         })
//       );

//       // Reset race state
//       setRaceStatus('reset');
//       setWinner(null);

//       // Refresh winners list
//       try {
//         const { fetchWinners } = useWinnerStore.getState();
//         await fetchWinners(1); // Reset to first page
//       } catch (error) {
//         console.error('[handleResetAll] Error refreshing winners:', error);
//       }

//     } catch (error) {
//       console.error('[handleResetAll] Reset error:', error);
//     }
//   };

//   return { handleRaceAll, handleResetAll };
// }



import { useRaceStore } from '../app/zustand/useRaceStore';
import { useCarStore } from '../app/zustand/useGarageStore';
import { startEngine, driveEngine, stopEngine } from '../api/engine';
import { useWinnerStore } from '../app/zustand/useWinnersStore';
import { getAllWinners } from '../api/winners';
import type { Winner } from '../types/models';

export function useRaceHandlers() {
  const cars = useCarStore(state => state.cars);
  const {
    startEngine: storeStartEngine,
    driveEngine: storeDriveEngine,
    stopEngine: storeStopEngine,
    setRaceStatus,
    setWinner
  } = useRaceStore();

  const handleRaceAll = async () => {
    console.log('[handleRaceAll] Starting race with cars:', cars.length);
    try {
      setRaceStatus('racing');
      setWinner(null);

      const raceResults = await Promise.all(
        cars.map(async car => {
          try {
            const { velocity, distance } = await startEngine(car.id);
            storeStartEngine(car.id, velocity, distance);
            
            const duration = distance / velocity / 1000;
            const driveSuccess = await driveEngine(car.id);
            
            if (!driveSuccess) throw new Error('Engine failure');

            await new Promise(resolve => setTimeout(resolve, duration * 1000));
            
            await stopEngine(car.id);
            storeStopEngine(car.id);
            
            return {
              id: car.id,
              time: parseFloat(duration.toFixed(2)),
              success: true,
              name: car.name // Include car name
            };
          } catch (error) {
            console.error(`Error for car ${car.id}:`, error);
            try {
              await stopEngine(car.id);
              storeStopEngine(car.id);
            } catch (stopError) {
              console.error(`Error stopping car ${car.id}:`, stopError);
            }
            return {
              id: car.id,
              success: false
            };
          }
        })
      );

      const successfulCars = raceResults
        .filter(result => result.success)
        .map(result => ({ 
          id: result.id!, 
          time: result.time!,
          name: result.name!
        }));

      if (successfulCars.length > 0) {
        const winner = successfulCars.reduce((prev, current) => 
          prev.time < current.time ? prev : current
        );

        setWinner({ 
          id: winner.id, 
          wins: 1, 
          time: winner.time,
          name: winner.name 
        });

        try {
          const { addWinner, fetchWinners } = useWinnerStore.getState();
          
          await addWinner({ 
            id: winner.id, 
            wins: 1, 
            time: winner.time,
            name: winner.name
          });
          
          const { winners: allWinners, totalCount } = await getAllWinners();
          useWinnerStore.getState().setWinners(allWinners);
          
          const { currentPage } = useWinnerStore.getState();
          await fetchWinners(currentPage, 10);
          
        } catch (error) {
          console.error('Error updating winners:', error);
        }
      }

      setRaceStatus('finished');
    } catch (error) {
      console.error('Race error:', error);
      setRaceStatus('ready');
    }
  };

  const handleResetAll = async () => {
    try {
      await Promise.all(
        cars.map(async car => {
          try {
            await stopEngine(car.id);
            storeStopEngine(car.id);
          } catch (error) {
            console.error(`Stop error for car ${car.id}:`, error);
          }
        })
      );

      setRaceStatus('reset');
      setWinner(null);

      try {
        const { fetchWinners } = useWinnerStore.getState();
        await fetchWinners(1);
      } catch (error) {
        console.error('Error refreshing winners:', error);
      }

    } catch (error) {
      console.error('Reset error:', error);
    }
  };

  return { handleRaceAll, handleResetAll };
}
