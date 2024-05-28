import { useEffect, useState } from "react";

import { getData } from "../service/data";

import Button from "./Button";
import Input from "./Input";

import "../css/Table.css";

export const Table = ({}) => {
    const [todos, setTodos] = useState([]);
    const [pages, setPages] = useState(0);
    const [showLoading, setShowLoading] = useState(false);


    const [description, setDescription] = useState("");

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const items = await getData();
        // console.log(items.data[0]);
        // console.log(items.data);

        const len = Object.keys(items.data).length;
        const numPag = len / 10;
        setPages(numPag);

        // console.log(items.data.lenght);
        setTodos(items.data);
    };

    const handleRefresh = async () => {
        setShowLoading(true);
        await getItems();
        setShowLoading(false);
    };

    const handleAdd = async () => {
        console.log("add");
    };

    return (
        <div className="table-container">
            <h4 className="table-title">To do list</h4>

            <Button onClick={handleRefresh} text="Refresh" />

            <div className="add-container">
                <Input
                    type="text"
                    title="Description"
                    name="inpt-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={handleAdd} text="Add" />
            </div>

            {showLoading ? (
                <h4 className="table-title">Loading</h4>
            ) : (
                <table className="table">
                    <tr>
                        <th className="table-column-title">#</th>
                        <th className="table-column-title">User</th>
                        <th className="table-column-title">Description</th>
                        <th className="table-column-title">Completed</th>
                    </tr>

                    {todos.map((item, index) => {
                        return (
                            <tr
                                key={index}
                                className={`table-row ${
                                    item.completed && "row-success"
                                }`}
                            >
                                <td>{item.id}</td>
                                <td>{item.userId}</td>
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
                        );
                    })}
                </table>
            )}
        </div>
    );
};

export default Table;
