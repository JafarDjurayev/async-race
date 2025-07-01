import { useRaceStore } from '../app/zustand/useRaceStore';
import { useCarStore } from '../app/zustand/useGarageStore';
import { startEngine, driveEngine, stopEngine } from '../api/engine';
import { useWinnerStore } from '../app/zustand/useWinnersStore';
import { getAllWinners } from '../api/winners';

export function useRaceHandlers() {
  const cars = useCarStore(state => state.cars);
  const {
    startEngine: storeStartEngine,
    stopEngine: storeStopEngine,
    setRaceStatus,
    setWinner,
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
              name: car.name, // Include car name
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
              success: false,
            };
          }
        }),
      );

      const successfulCars = raceResults
        .filter(result => result.success)
        .map(result => ({
          id: result.id!,
          time: result.time!,
          name: result.name!,
        }));

      if (successfulCars.length > 0) {
        const winner = successfulCars.reduce((prev, current) =>
          prev.time < current.time ? prev : current,
        );

        setWinner({
          id: winner.id,
          wins: 1,
          time: winner.time,
          name: winner.name,
        });

        try {
          const { addWinner, fetchWinners } = useWinnerStore.getState();

          await addWinner({
            id: winner.id,
            wins: 1,
            time: winner.time,
            name: winner.name,
          });

          const { winners: allWinners} = await getAllWinners();
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
        }),
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
