import React, { useState, useEffect } from 'react';
import '../styles/accountSectionStyles.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function AccountSection() {
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
        <div className="accountSectionContainer">
            <div className="accountCard">
                <div className="profilePic">
                    <img src={user.link} alt="" />
                </div>
                <h4>{user.username}</h4>
            </div>
            <NavLink to='/' style={({ isActive }) => {
                return (isActive) ? { color: '#0089e5', textDecoration: 'none' } : { color: 'black', textDecoration: 'none' }
            }} ><h4>Dashboard</h4></NavLink>
            <NavLink to='/ranks' style={({ isActive }) => {
                return (isActive) ? { color: '#0089e5', textDecoration: 'none' } : { color: 'black', textDecoration: 'none' }
            }} ><h4>LeaderBoard</h4></NavLink>
        </div>
    )
}
