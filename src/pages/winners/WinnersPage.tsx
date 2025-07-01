import { useEffect, useState, type JSX } from 'react';
import '../../styles/Winners.css';
import { useWinnerStore } from '../../app/zustand/useWinnersStore';
import { useCarStore } from '../../app/zustand/useGarageStore';
import Pagination from '../../components/Pagination';
import WinnerRow from '../../components/WinnerRow';
import WinnersTableHeader from '../../components/WinnersTableHeader';

export default function WinnersPage(): JSX.Element {
  const {
    winners,
    totalCount,
    loading,
    error,
    fetchWinners,
    currentPage,
    setCurrentPage,
  } = useWinnerStore();
  const { cars } = useCarStore();
  const [sort, setSort] = useState<'id' | 'wins' | 'time'>('id');
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');
  const limit = 10;

  useEffect(() => {
    void fetchWinners(currentPage, limit, sort, order);
  }, [currentPage, sort, order]);

  const onSort = (type: typeof sort) => {
    setCurrentPage(1);
    setSort(type);
    setOrder(prev => (sort === type && prev === 'ASC' ? 'DESC' : 'ASC'));
  };
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="winners-container">
      <h2>Winners ({totalCount})</h2>
      <table className="winners-table">
        <WinnersTableHeader sort={sort} order={order} onSort={onSort} />
        <tbody>
          {winners.map((w, i) => (
            <WinnerRow
              key={w.id}
              winner={w}
              index={i}
              page={currentPage}
              limit={limit}
              car={cars.find(c => c.id === w.id)}
            />
          ))}
        </tbody>
      </table>
      {totalCount > limit && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / limit)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
