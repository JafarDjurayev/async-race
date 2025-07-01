import React, { type JSX } from 'react';
import '../styles/Controls.css';
import { useGenerateCars } from './HandleGenerateCars';
import { CreateCarStore } from '../app/zustand/useGarageStore';
import { useCarUpdateHandler } from '../utils/GarageUtils';
import { useSyncCarInputs } from './HandleCarChanges';
import { useRaceHandlers } from '../utils/UseRaceHandlers';

export default function Controls(): JSX.Element {
  const { nameValue, colorValue, handleNameChange, handleColorChange } =
    useSyncCarInputs();
  const { handleGenerateClick } = useGenerateCars();
  const setCarName = CreateCarStore(state => state.setCarNameInput);
  const setCarColor = CreateCarStore(state => state.setCarColorInput);
  const createCar = CreateCarStore(state => state.createCar);
  const { handleUpdateClick } = useCarUpdateHandler();
  const { handleRaceAll, handleResetAll } = useRaceHandlers();

  return (
    <div className="controls">
      <div className="race-buttons">
        <button type="button" onClick={handleRaceAll}>
          RACE
        </button>
        <button type="button" onClick={handleResetAll}>
          RESET
        </button>
      </div>

      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Car name"
          className="input-name"
          onChange={e => setCarName(e.target.value)}
        />
        <input type="color" onChange={e => setCarColor(e.target.value)} />
        <button type="button" className="button-create" onClick={createCar}>
          CREATE
        </button>
      </form>

      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Car name"
          className="input-name"
          value={nameValue}
          onChange={handleNameChange}
        />
        <input
          type="color"
          className="color-input"
          value={colorValue}
          onChange={handleColorChange}
        />
        <button
          type="button"
          className="button-update"
          onClick={handleUpdateClick}
        >
          UPDATE
        </button>
      </form>
      <button type="button" onClick={handleGenerateClick}>
        GENERATE
      </button>
    </div>
  );
}
