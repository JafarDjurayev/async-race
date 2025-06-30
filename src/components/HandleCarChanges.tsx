// import { useEffect } from 'react';
// import { useCarStore, useCarUpdateStore } from '../app/zustand/useGarageStore';

// export const useSyncCarInputs = () => {
//   const { selectedCar } = useCarUpdateStore();
//   const { 
//     carNameInput, 
//     carColorInput, 
//     setCarNameInput, 
//     setCarColorInput 
//   } = useCarStore();

//   // Initialize inputs when car is selected or changes
//   useEffect(() => {
//     if (selectedCar) {
//       console.log('Initializing inputs for car:', selectedCar.id);
      
//       // Only update if inputs are at defaults or different from selected car
//       if (carNameInput === '' || carColorInput === '#000000') {
//         setCarNameInput(selectedCar.name);
//         setCarColorInput(selectedCar.color);
//       }
//     } else {
//       // Reset to defaults when no car is selected
//       setCarNameInput('');
//       setCarColorInput('#000000');
//     }
//   }, [selectedCar?.id]); // Only run when selected car ID changes

//   // Handle name changes
//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newName = e.target.value;
//     console.log('Name changed to:', newName);
//     setCarNameInput(newName);
//   };

//   // Handle color changes
//   const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newColor = e.target.value;
//     console.log('Color changed to:', newColor);
//     setCarColorInput(newColor);
//   };

//   return {
//     nameValue: selectedCar && carNameInput === '' 
//       ? selectedCar.name 
//       : carNameInput,
//     colorValue: selectedCar && carColorInput === '#000000' 
//       ? selectedCar.color 
//       : carColorInput,
//     handleNameChange,
//     handleColorChange
//   };
// };


import { useEffect } from 'react';
import { useCarStore, useCarUpdateStore } from '../app/zustand/useGarageStore';

export const useSyncCarInputs = () => {
  const { selectedCar } = useCarUpdateStore();
  const { 
    carNameInput, 
    carColorInput, 
    setCarNameInput, 
    setCarColorInput 
  } = useCarStore();

  // Initialize inputs when car is selected or changes
  useEffect(() => {
    if (selectedCar) {
      console.log('Initializing inputs for car:', selectedCar.id, {
        name: selectedCar.name,
        color: selectedCar.color
      });
      
      // Always update inputs when selected car changes
      setCarNameInput(selectedCar.name);
      setCarColorInput(selectedCar.color);
    } else {
      // Reset to defaults when no car is selected
      setCarNameInput('');
      setCarColorInput('#000000');
    }
  }, [selectedCar?.id]); // Only run when selected car ID changes

  // Handle name changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    console.log('Name changed to:', newName);
    setCarNameInput(newName);
  };

  // Handle color changes
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    console.log('Color changed to:', newColor);
    setCarColorInput(newColor);
  };

  return {
    nameValue: carNameInput,
    colorValue: carColorInput,
    handleNameChange,
    handleColorChange
  };
};