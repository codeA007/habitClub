import React, { createContext, useState } from 'react'

export const refreshContext = createContext();

export default function RefreshContext(props) {
    const [refresh, setRefresh] = useState(false);
    return (
        <refreshContext.Provider
            value={[refresh, setRefresh]}
        >
            {props.children}
        </refreshContext.Provider>
    )
}
