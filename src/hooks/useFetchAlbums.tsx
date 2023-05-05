import {useState, useEffect} from "react";
import axios from "axios";
import {IAlbum} from "../types";

export const useFetchAlbums = (): IAlbum[] => {
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get<IAlbum[]>(
                    "https://jsonplaceholder.typicode.com/albums"
                );
                // await addUserData(response.data);
                setAlbums(response.data);
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };
        fetchAlbums();
    }, []);

    return albums;
};