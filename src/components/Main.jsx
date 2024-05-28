import { useEffect, useState } from "react";

import { getData } from "../service/data";

import Button from "./Button";
import Input from "./Input";
import TablePagination from "./TablePagination";

import "../css/Main.css";

export const Main = ({}) => {
    const [todos, setTodos] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [error, setSetError] = useState(false);

    const [description, setDescription] = useState("");

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const items = await getData();

        if (items.status === 200) {
            setTodos(items.data);
        } else {
            setSetError(true);
        }
    };

    const handleRefresh = async () => {
        setShowLoading(true);
        await getItems();
        setShowLoading(false);
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        setTodos([
            {
                id: Math.floor(Math.random() * 1000) + 1,
                userId: Math.floor(Math.random() * 100) + 1,
                title: description,
                completed: false,
            },
            ...todos,
        ]);

        setDescription("");
    };

    return (
        <div className="main-container">
            <h4 className="title">To do list</h4>
            <h3>Developed by: Madelin Flores</h3>

            {error ? (
                <h4 className="title">Error</h4>
            ) : (
                <div className="inner-container">
                    <div className="button-container">
                        <Button onClick={handleRefresh} text="Refresh" />
                    </div>

                    <div className="add-container">
                        <form onSubmit={handleAdd}>
                            <Input
                                type="text"
                                title="Description"
                                name="inpt-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <Button type="submit" text="Add" />
                        </form>
                    </div>

                    {showLoading ? (
                        <h4 className="title">Loading</h4>
                    ) : (
                        <TablePagination data={todos} itemsPerPage={10} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Main;
