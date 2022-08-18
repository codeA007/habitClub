import React, { useState, useEffect, useContext } from 'react';
import '../styles/habitListSectionStyle.css';
import Habit from './Habit';
import axios from 'axios';
import { refreshContext } from '../context/refreshContext';

export default function HabitListSection(props) {
    const [resData, setResData] = useState([]);
    const [user, setUser] = useState('');
    const [refresh, setRefresh] = useContext(refreshContext);
    const getData = async () => {
        const data = {
            token: localStorage.getItem('habitClubUser')
        }
        const res = await axios.post('https://habitsclub.herokuapp.com/habit/get', data);
        setResData(res.data.data)
        setUser(res.data.user)
        setRefresh(false);
    }
    useEffect(() => {
        getData();
    }, [refresh])
    return (
        <div className="HabitListContainer">
            <div className="habitNavbar">
                <p>Habit List</p>
                <button onClick={() => props.showModal(true)}>Add habit</button>
                <h4>Total Streaks 🔥: {user.totalStreaks}</h4>
            </div>
            <div className="habitsContainer">
                {resData.map((habit) => (
                    < Habit habitName={habit.habitName} createdDate={habit.createdDate} habitStreaks={habit.streakCount} daysLeft={habit.daysLeft} totalDays={habit.totalDays} key={habit._id} id={habit._id} completedToday={habit.completedToday} />
                ))}
            </div>
        </div>
    )
}
