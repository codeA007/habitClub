import React, { useEffect, useState } from 'react'
import AccountSection from '../components/AccountSection'
import Navbar from '../components/Navbar';
import '../styles/ranksStyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LeaderBoardPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('habitClubUser') == null) {
            return navigate('/createAccount')
        }
        getRanks();
    }, []);
    const getRanks = async () => {
        const res = await axios.post('https://habitsclub.herokuapp.com/user/ranks', {
            token: localStorage.getItem('habitClubUser'),
        })
        setData(res.data.ranks);
    }
    return (
        <>
            <Navbar />
            <div className="leaderboardContainer">
                <AccountSection />
                <div className="rankContainer">
                    <h4>LEADER BOARD</h4>
                    {data.map((d, index) => {
                        return <div className="rank">
                            <h5>{d.username}</h5>
                            <p>🏆 {index + 1}</p>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}
