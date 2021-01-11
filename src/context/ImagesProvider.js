
import React, { useState, createContext, } from "react";

export const ImagesContext = createContext();

export const ImagesProvider = (props) => {
    const [images, setImages] = useState([]);
    return (
        <ImagesContext.Provider value={[images, setImages]}>
            {props.children}
        </ImagesContext.Provider>
    );
}