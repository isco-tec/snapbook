import React, {createContext, useState, useContext, ReactNode} from "react";
import {IExpandableState, IPhoto} from "../../types";



const ExpandableStateContext = createContext<IExpandableState | undefined>(undefined);

export const ExpandableStateProvider = ({children}: { children: ReactNode }) => {
    const [expandedAlbumId, setExpandedAlbumId] = useState<number | null>(null);

    const toggleExpandAlbum = (albumId: number) => {
        if (albumId === expandedAlbumId) {
            setExpandedAlbumId(null);
        } else {
            setExpandedAlbumId(albumId);
        }
    };


    const expandableState: IExpandableState = {
        expandedAlbumId,
        handleToggleExpandAlbum: toggleExpandAlbum,
    };


    return (
        <ExpandableStateContext.Provider value={expandableState}>
            {children}
        </ExpandableStateContext.Provider>
    );
};

export const useExpandableStateContext = (): IExpandableState => {
    const context = useContext(ExpandableStateContext);

    if (!context) {
        throw new Error(
            "useExpandableStateContext must be used within an ExpandableStateProvider"
        );
    }

    return context;
};
