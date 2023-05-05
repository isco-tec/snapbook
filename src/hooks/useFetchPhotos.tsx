import { useState, useEffect } from "react";
import axios from "axios";
import {IPhoto} from "../types";

export const useFetchPhotos = (albumId:number | null): IPhoto[] => {
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get<IPhoto[]>(
                    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
                );
                setPhotos(response.data.slice(0, 12));
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        albumId && fetchPhotos();
    }, [albumId]);

    return photos;
};
