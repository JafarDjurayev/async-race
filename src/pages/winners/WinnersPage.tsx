import React, { useEffect, type JSX } from "react";
import '../../styles/Winners.css';
import { useWinnersPaginationStore, useWinnerStore } from '../../app/zustand/useWinnersStore';
import Pagination from "../../components/Pagination";

export default function WinnersPage(): JSX.Element {
    const currentPage = useWinnersPaginationStore((state) => state.currentPage);
    const winners = useWinnerStore((state) => state.winners);
    const totalPages = useWinnersPaginationStore((state) => state.totalPages);
    const setCurrentPage = useWinnersPaginationStore((state) => state.setCurrentPage);
    const setTotalPages = useWinnersPaginationStore((state) => state.setTotalPages);
    useEffect(() => {
        setTotalPages(Math.ceil(winners.length / 10));
    }, [winners]);
    return (<>
        <div className="container">
            <table className="winners-table">
                <thead>
                    <tr>
                        <th>Car Name</th>
                        <th>Wins</th>
                        <th>Best Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ textAlign: "center" }}>
                        <td>Tesla</td>
                        <td>1</td>
                        <td>10</td>
                    </tr>
                </tbody>
            </table>
            {winners.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}
                />
            )}
        </div>
    </>)
}