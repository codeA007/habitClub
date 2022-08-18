import React, { useState, useEffect } from 'react'
import AccountSection from '../components/AccountSection'
import HabitListSection from '../components/HabitListSection';
import Navbar from '../components/Navbar';
import '../styles/homePageStyles.css';
import ProgressSection from '../components/ProgressSection';
import AddHabit from '../components/AddHabit';
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('habitClubUser') == null) {
            return navigate('/createAccount')
        }
    }, [])
    const [add, setAdd] = useState(false);
    return (
        <div className="homePageContainer" style={{ "height": "100vh" }}>
            <Navbar />
            <div className="homePageGrid">
                {(add === true) ? <AddHabit showModal={add => setAdd(add)} /> : ''}
                <AccountSection />
                <HabitListSection showModal={add => setAdd(add)} />
                <ProgressSection />
            </div>
        </div>
    )
}
