import React, { useState, useContext } from 'react';
import { refreshContext } from '../context/refreshContext';
import '../styles/addHabitStyles.css';
import axios from 'axios';

export default function AddHabit(props) {
    const [habitName, setName] = useState('');
    const [number, setNumber] = useState('');
    const [refresh, setRefresh] = useContext(refreshContext);
    const addData = async (e) => {
        e.preventDefault();
        let data = {
            token: localStorage.getItem('habitClubUser'),
            habitName,
            days: number
        }
        const res = await axios.post('https://habitsclub.herokuapp.com/habit/add', data);
        if (res.data.message == 'habit Created') {
            props.showModal(false);
            setRefresh(true);
        }
    }
    return (
        <div className='addHabitContainer'>
            <form action="" className="addHabitForm">
                <h3>Add Habit Details</h3>
                <input required type="text" name='habitName' value={habitName} onChange={(e) => setName(e.target.value)} placeholder="Habit name" />
                <input type="number" name='number' value={number} onChange={(e) => setNumber(e.target.value)} placeholder="no of days" />
                <button onClick={addData} className="add">Add</button>
            </form>
        </div>
    )
}
