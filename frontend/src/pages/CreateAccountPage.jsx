import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/createAccountStyles.css';
import axios from 'axios';
// import {  } from "react-router-dom";

export default function CreateAccountPage() {
    function makeid() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [random, setRandom] = useState('');
    let img = useRef(null);
    let navigate = useNavigate();
    const error = useRef(null);
    useEffect(() => {
        if (localStorage.getItem('habitClubUser')) {
            return navigate('/')
        }
    }, [])
    const createAccount = async (e) => {
        e.preventDefault();
        let data = {
            username,
            password,
            link: img.current.getAttribute('src'),
        }
        // console.log(data);
        try {
            let res = await axios.post('https://habitsclub.herokuapp.com/user/createUser', data);
            console.log(res.data);
            localStorage.setItem('habitClubUser', res.data.token);
            return navigate('/')
        }
        catch (err) {
            if (err.response.data.message === 'user found') {
                error.current.innerText = 'please try different username!!'
            }
        }
    }
    return (
        <div className="createAccountContainer">
            <h4>Create Account 💻</h4>
            <form action="" className="createAccountForm">
                <div className="profilePic">
                    <img ref={img} src={`https://avatars.dicebear.com/api/bottts/${random}.svg`} alt="" />
                </div>
                <button className="changeAvatar" onClick={(e) => {
                    e.preventDefault();
                    setRandom(makeid());
                }}>Change avatar</button>
                <p ref={error}></p>
                <input required value={username} name='username' onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" />
                <input required value={password} name='password' onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                <button className="create" onClick={createAccount}>Create Account</button>
            </form>
            <Link to='/login' >Login user</Link>
        </div>
    )
}
