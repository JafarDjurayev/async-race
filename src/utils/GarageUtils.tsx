import { DeleteCar, UpdateCar } from '../api/garage';
import { brands, models, type Car } from '../types/models';
import { useCarStore, useCarUpdateStore } from '../app/zustand/useGarageStore';

export function useCarUpdateHandler() {
  const clearSelectedCar = useCarUpdateStore(state => state.clearSelectedCar);
  const updateCarInStore = useCarStore(state => state.updateCar);
  const { setCarNameInput, setCarColorInput } = useCarStore();

  const handleUpdateClick = async () => {
    console.groupCollapsed('[CarUpdateHandler] Update Process');

    try {
      const { selectedCar } = useCarUpdateStore.getState();
      const { carNameInput, carColorInput } = useCarStore.getState();

      if (!selectedCar) {
        console.warn('No car selected');
        return;
      }

      console.log(' Selected Car:', {
        id: selectedCar.id,
        name: selectedCar.name,
        color: selectedCar.color,
      });

      console.log('Current Inputs:', {
        name: carNameInput,
        color: carColorInput,
      });

      const updateName = carNameInput.trim() || selectedCar.name;
      const updateColor = carColorInput || selectedCar.color;

      if (!updateName) {
        console.warn(' Empty car name');
        return;
      }

      const updateData = {
        ...selectedCar,
        name: updateName,
        color: updateColor,
      };

      console.log(' Update Data:', updateData);

      const currentStoreCar = useCarStore
        .getState()
        .cars.find(c => c.id === selectedCar.id);
      console.log('Current Store Version:', currentStoreCar);

      console.log('Applying optimistic update');
      updateCarInStore(updateData);

      console.log('Calling API...');
      const response = await UpdateCar(updateData);
      console.log(' API Response:', response);

      console.log('Applying server response');
      updateCarInStore(response);

      console.log(' Resetting form');
      clearSelectedCar();
      setCarNameInput('');
      setCarColorInput('#000000');

      console.log('Update successful!');
    } catch (error) {
      console.error('Update failed:', error);
      const { selectedCar } = useCarUpdateStore.getState();
      if (selectedCar) {
        console.log('Reverting to original');
        updateCarInStore(selectedCar);
      }
    } finally {
      console.groupEnd();
    }
  };

  return { handleUpdateClick };
}

function getRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function getRandomName(): string {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${brand} ${model}`;
}

export function generate100RandomCars(startingId: number): Car[] {
  return Array.from({ length: 100 }, (_, i) => ({
    id: startingId + 1 + i,
    name: getRandomName(),
    color: getRandomColor(),
  }));
}

export async function handleRemoveCar(carId: number): Promise<void> {
  try {
    await DeleteCar(carId);
    useCarStore.getState().removeCar(carId);
  } catch (error) {
    console.error(`Failed to delete car with ID ${carId}:`, error);
  }
}
