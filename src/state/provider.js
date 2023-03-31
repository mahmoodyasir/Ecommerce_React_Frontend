import React, {createContext, useContext, useReducer, useState} from "react";

export const Context = createContext();
export const stateContext = createContext();

export const Globalstate = ({reducer, initialstate, children}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const allState = {currentPage, setCurrentPage}

    return (
        <Context.Provider value={useReducer(reducer, initialstate)}>
            <stateContext.Provider value={allState}>
                {children}
            </stateContext.Provider>
        </Context.Provider>
    )
}

export const useGlobalState = () => useContext(Context)