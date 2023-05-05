export interface IAlbum {
    id: number;
    title: string;
    user: IUser;
    userId: number;
}

export interface IPhoto {
    id: number;
    title: string;
    thumbnailUrl: string;
    url: string;
}

export interface IExpandableState {
    expandedAlbumId: number | null;
    handleToggleExpandAlbum: (albumId: number) => void;
}

export interface IUser {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": {
        "street": string,
        "suite": string,
        "city": string,
        "zipcode": string,
        "geo": {
            "lat": string,
            "lng": string
        }
    },
    "phone": string,
    "website": string,
    "company": {
        "name": string,
        "catchPhrase": string,
        "bs": string
    }
}