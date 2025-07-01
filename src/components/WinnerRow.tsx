// WinnerRow.tsx (new file, ~10 lines)
import type { Car, Winner } from './../types/models';

export default function WinnerRow({
  winner,
  index,
  page,
  limit,
  car,
}: {
  winner: Winner;
  index: number;
  page: number;
  limit: number;
  car?: Car;
}) {
  return (
    <tr>
      <td>{(page - 1) * limit + index + 1}</td>
      <td>{winner.id}</td>
      <td>
        {car && <div className="car-icon" style={{ backgroundColor: car.color }} />}
      </td>
      <td>{car?.name || 'Unknown'}</td>
      <td>{winner.wins}</td>
      <td>{winner.time.toFixed(2)}</td>
    </tr>
  );
}
