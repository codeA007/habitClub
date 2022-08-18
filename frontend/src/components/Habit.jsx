import React, { useState, useRef, useEffect, useContext } from 'react';
import '../styles/habitStyles.css';
import axios from 'axios';
import { ProgressContext } from '../context/progressContext'

export default function Habit({ habitName, habitStreaks, createdDate, daysLeft, totalDays, id, completedToday }) {
    const [info2, setInfo2] = useContext(ProgressContext);
    const [width, setWidth] = useState('');
    const [details, setDetails] = useState(false);
    const [completed, setCompleted] = useState(true);
    const [com, setCom] = useState('');
    const [data, setData] = useState({
        streakCount: '',
        daysLeft: '',
        totalDays: ''
    })
    const [streakCount, setStreakCount] = useState(null);
    const [leftDays, setLeftDays] = useState(null);
    const [totalDays2, setTotalDays2] = useState(null);
    // const [text,setText] = useState('');
    const info = useRef(null);
    const text = useRef(null);
    const habit = useRef(null);
    const check = useRef(null);
    const streak = useRef(null);
    const daysLeft2 = useRef(null)
    useEffect(() => {
        setWidth(window.innerWidth);
        if (completedToday == true) {
            console.log();
            text.current.style.textDecoration = "line-through";
            text.current.style.color = "#b1b0b2";
            text.current.style.fontStyle = "italic";
            check.current.style.backgroundColor = "#0089e5";
            check.current.classList.remove("fa-check");
            check.current.style.color = "white";
            check.current.classList.add("fa-minus");
            setCompleted(false);
        }
        else {
            text.current.style.textDecoration = "";
            text.current.style.color = "black";
            text.current.style.fontStyle = "normal";
            check.current.style.backgroundColor = "white";
            check.current.style.color = "black";
            check.current.classList.remove("fa-minus");
            check.current.classList.add("fa-check");
            setCompleted(true);
        }
    }, [])
    useEffect(() => {
        if (streakCount != null) {
            streak.current.innerText = `Streaks 🔥 :${streakCount}`;
            daysLeft2.current.innerText = `Days Left :${leftDays}/${totalDays2}`;
        }
        // });
    }, [streakCount, leftDays, totalDays2]);
    const showDetails = (e) => {
        if (streakCount == null) {
            setInfo2({ streakCount: habitStreaks, leftDays3: daysLeft, totalDays3: totalDays, createdAt: createdDate });
        }
        setDetails(!details);
        if (width <= 600) {
            if (e.target.classList.contains("habitContainer") || e.target.classList.contains("mainHabitContainer")) {
                if (details) {
                    info.current.style.display = 'none';
                }
                else {
                    info.current.style.display = 'block';
                }
            }
        }
    }
    const getData = async (id) => {
        const res = await axios.post('https://habitsclub.herokuapp.com/habit/complete', {
            token: localStorage.getItem('habitClubUser'),
            id: id
        })
        console.log(res.data.message);
        setStreakCount(res.data.message.streakCount);
        setLeftDays(res.data.message.daysLeft);
        setTotalDays2(res.data.message.totalDays);
        setCom(res.data.message.completedToday);
        setInfo2({ streakCount: res.data.message.streakCount, createdAt: res.data.message.createdDate, totalDays3: res.data.message.totalDays, leftDays3: res.data.message.daysLeft });
    }
    const actions = async (e) => {
        if (e.target.classList.contains("delete")) {
            const res = await axios.post('https://habitsclub.herokuapp.com/habit/delete', {
                token: localStorage.getItem('habitClubUser'),
                id: habit.current.getAttribute("value")
            })
            console.log(res);
            if (res.data.message == 'deleted') {
                habit.current.innerHTML = '';
            }

        }
        if (e.target.classList.contains("check")) {
            getData(habit.current.getAttribute("value"));
            if (completed) {
                text.current.style.textDecoration = "line-through";
                text.current.style.color = "#b1b0b2";
                text.current.style.fontStyle = "italic";
                e.target.style.color = "white";
                e.target.style.backgroundColor = "#0089e5";
                e.target.classList.remove("fa-check");
                e.target.classList.add("fa-minus");
                setCompleted(false);
            }
            else {
                text.current.style.textDecoration = "";
                text.current.style.color = "black";
                text.current.style.fontStyle = "normal";
                e.target.style.color = "black";
                e.target.style.backgroundColor = "white";
                e.target.classList.remove("fa-minus");
                e.target.classList.add("fa-check");
                setCompleted(true);
            }
        }
    }
    return (
        <div className="mainHabitContainer" value={id} ref={habit} onClick={showDetails}>
            <div className="habitContainer">
                <p ref={text}>{habitName}</p>
                <div className="habitActions" onClick={actions}>
                    <i class="fa-solid fa-check check" value={id} ref={check}></i>
                    <i class="fa-solid fa-trash delete"></i>
                </div>
            </div>
            <div className="info" ref={info}>
                <p ref={daysLeft2}>Days left : {`${daysLeft}/${totalDays}`}</p>
                <p>Created At : {createdDate}</p>
                <p ref={streak}>Streak 🔥:{habitStreaks}</p>
            </div>
        </div>
    )
}
