import React from 'react';
import '../styles/CarControlPanel.css';
import { useCarControls } from '../utils/useCarControls';
import type { CarControlPanelProps } from '../types/models';

export default function CarControlPanel({ carId }: CarControlPanelProps) {
  const { handleStartDrive, handleStop, handleSelect, handleRemove } =
    useCarControls(carId);

  return (
    <div className="car-control-panel">
      <div>
        <button
          type="button"
          className="car-select-button"
          onClick={handleSelect}
        >
          SELECT
        </button>
        <br />
        <br />
        <button
          type="button"
          className="car-remove-button"
          onClick={handleRemove}
        >
          REMOVE
        </button>
      </div>
      <div>
        <button
          type="button"
          className="car-control-button"
          onClick={handleStartDrive}
        >
          S
        </button>
        <br />
        <br />
        <button
          type="button"
          className="car-control-button"
          onClick={handleStop}
        >
          R
        </button>
      </div>
    </div>
  );
}
