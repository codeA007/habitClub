import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/createAccountStyles.css';
import axios from 'axios';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            password
        }
        try {
            let res = await axios.post('https://habitsclub.herokuapp.com/user/loginUser', data);
            console.log(res.data);
            localStorage.setItem('habitClubUser', res.data.token);
            return navigate('/')
        }
        catch (err) {
            if (err.response) {
                error.current.innerText = 'please check details!!!...'
            }
        }
    }
    return (
        <div className="createAccountContainer">
            <h4>Login !!! 💻</h4>
            <form action="" className="createAccountForm">
                <p ref={error}></p>
                <input required value={username} name='username' onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" />
                <input required value={password} name='password' onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                <button className="create" onClick={createAccount}>Login</button>
            </form>
            <Link to='/createAccount' >create Account</Link>
        </div>
    )
}
