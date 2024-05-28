import { useState } from "react";

import "../css/TablePagination.css";

export const TablePagination = ({ data, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <span
                    key={i}
                    className={`page-number ${currentPage === i && "page-active" }`}
                    onClick={() => handleClick(i)}
                >
                    {i}
                </span>
            );
        }
        return pageNumbers;
    };

    return (
        <div>
            <table className="table">
                <tr>
                    <th className="table-column-title">#</th>
                    <th className="table-column-title">User</th>
                    <th className="table-column-title">Description</th>
                    <th className="table-column-title">Completed</th>
                </tr>

                {currentItems.map((item, index) => (
                    <tr
                        key={index}
                        className={`table-row ${
                            item.completed ? "row-success" : "row-uncompleted"
                        }`}
                    >
                        <td>{item.id}</td>
                        <td>{item.user}</td>
                        <td>{item.title}</td>
                        <td className="table-icon">
                            {item.completed ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            )}
                        </td>
                    </tr>
                ))}
            </table>

            <div className="numbers-container">{renderPageNumbers()}</div>
        </div>
    );
};

export default TablePagination;
