import React, { useContext, useEffect } from 'react';
import { ProgressContext } from '../context/progressContext';
import '../styles/progressSectionStyles.css';

export default function ProgressSection() {
    const [info, setInfo] = useContext(ProgressContext);
    return (
        <div className="progressSectionContainer">
            <h4 className="progress">Habit Progress</h4>
            <div className="dataContainer">
                <div>
                    <h4>Streaks 🔥</h4>
                    <p>{info.streakCount}</p>
                </div>
                <div>
                    <h4>CreatedAt 📅</h4>
                    <p>{info.createdAt}</p>
                </div>
                <div>
                    <h4>Days Left 🎯</h4>
                    <p>{info.leftDays3}{(info.leftDays3 != null) ? "/" : ''}{info.totalDays3}</p>
                </div>
            </div>
        </div>
    )
}
