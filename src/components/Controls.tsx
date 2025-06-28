import React, {type JSX} from 'react';
import '../styles/Controls.css';
import { useGenerateCars } from './HandleGenerateCars';

export default function Controls(): JSX.Element {
   const { handleGenerateClick } = useGenerateCars();
  return (
    <>
      <div className="controls">
        <div className="race-buttons">
          <button type="button">RACE</button>
          <button type="button">RESET</button>
        </div>
        <form>
          <input type="text" placeholder="Car name" className="input-name" />
          <input type="color" />
          <button type="button" className="button-create">
            CREATE
          </button>
        </form>
        <form>
          <input type="text" placeholder="Car name" className="input-name" />
          <input type="color" />'
          <button type="button" className="button-update">
            UPDATE
          </button>
        </form>
        <button type="button" onClick={handleGenerateClick}>GENERATE</button>
      </div>
    </>
  );
}
