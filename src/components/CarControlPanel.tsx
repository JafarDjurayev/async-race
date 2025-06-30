import React, { type JSX } from "react";
import '../styles/CarControlPanel.css';
import { useCarStore, useCarUpdateStore } from "../app/zustand/useGarageStore";
import { type CarControlPanelProps } from "../types/models";
import { handleRemoveCar } from "../utils/GarageUtils";


export default function CarControlPanel({ carId }: CarControlPanelProps): JSX.Element {

    const cars = useCarStore((state) => state.cars);
    const setSelectedCar = useCarUpdateStore((state) => state.setSelectedCar);
  const handleSelectClick = () => {
    const selected = cars.find((car) => car.id === carId);
    if (selected) {
      setSelectedCar(selected);
      console.log('Selected car:', selected);
    }else {
    console.warn('No car found with ID:', carId); // ⚠️ Debug: invalid ID?
  }
  };
    const handleClick = () => {
        void handleRemoveCar(carId);
    };
    return (<>
        <div className="car-control-panel">
            <div>
                <button type="button" className="car-select-button" onClick={handleSelectClick}>
                    SELECT
                </button>
                <br />
                <br />
                <button type="button" className="car-remove-button" onClick={handleClick}>
                    REMOVE
                </button>
            </div>
            <div>
                <button type="button" className="car-control-button">S</button>
                <br />
                <br />
                <button type="button" className="car-control-button">R</button>
            </div>
        </div>
    </>)
}
