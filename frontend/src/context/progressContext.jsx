import React, { createContext, useState } from 'react'

export const ProgressContext = createContext();

export const ProgressProvider = (props) => {
    const [info, setInfo] = useState([{
        createAt: '',
        leftDays3: '',
        totalDays3: '',
        streakCount: ''
    }]);
    return (
        <ProgressContext.Provider value={[info, setInfo]}>
            {props.children}
        </ProgressContext.Provider>
    )
}
