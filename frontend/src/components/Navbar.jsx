import React, { useState, useEffect } from 'react';
import '../styles/navbarStyles.css';
import axios from 'axios';

export default function Navbar() {
    useEffect(() => {
        getUser()
    }, [])
    const [user, setUser] = useState({
        username: 'username',
        link: 'image'
    })
    const getUser = async () => {
        let res = await axios.post('https://habitsclub.herokuapp.com/user/getUser', {
            token: localStorage.getItem('habitClubUser'),
        })
        setUser({ username: res.data.user.username, link: res.data.user.link })
    }
    return (
        <div className="navbarContainer">
            <p>HabitClub</p>
            <div className="imgContainer">
                <img src={user.link} alt="" />
            </div>
        </div>
    )
}
