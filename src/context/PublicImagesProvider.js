

import React, { useState, createContext, } from "react";

export const PublicImagesContext = createContext();

export const PublicImagesProvider = (props) => {
    const [publicImages, setPublicImages] = useState([]);
    return (
        <PublicImagesContext.Provider value={[publicImages, setPublicImages]}>
            {props.children}
        </PublicImagesContext.Provider>
    );
}