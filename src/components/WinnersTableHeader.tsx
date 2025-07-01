// src/components/WinnersTableHeader.tsx
type Props = {
  sort: 'id' | 'wins' | 'time';
  order: 'ASC' | 'DESC';
  onSort: (type: 'id' | 'wins' | 'time') => void;
};

export default function WinnersTableHeader({ sort, order, onSort }: Props) {
  const sortSymbol = (type: string) =>
    sort === type ? (order === 'ASC' ? '↑' : '↓') : '';
  return (
    <thead>
      <tr>
        <th onClick={() => onSort('id')}># {sortSymbol('id')}</th>
        <th>ID</th>
        <th>Car</th>
        <th>Name</th>
        <th onClick={() => onSort('wins')}>Wins {sortSymbol('wins')}</th>
        <th onClick={() => onSort('time')}>Time {sortSymbol('time')}</th>
      </tr>
    </thead>
  );
}
