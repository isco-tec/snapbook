import {useState, useEffect} from "react";
import axios from "axios";
import {IUser} from "../types";

export const useFetchUsers = (): IUser[] => {
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<IUser[]>(
                    "https://jsonplaceholder.typicode.com/users"
                );
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };

        fetchUsers();
    }, []);

    return users;
};