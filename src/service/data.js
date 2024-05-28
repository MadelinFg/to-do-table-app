import axios from "axios";

export const getData = async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        return response
    } catch (error) {
        return error
    }
}