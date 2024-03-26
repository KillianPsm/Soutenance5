import React from 'react';
import './index.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Navbar from "./components/Navbar.tsx";
import {useAuth} from './context/AuthContext';
import Profile from "./pages/Profile.tsx";
import AddTrip from "./pages/AddTrip.tsx";
import MyTrips from "./pages/MyTrips.tsx";
import Register from "./pages/Register.tsx";

const App: React.FC = () => {
    const {isLoggedIn} = useAuth();

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Home/> : <Navigate to="/login" replace/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={isLoggedIn ? <Profile/> : <Navigate to="/login" replace/>}/>
                <Route path="/add-trip" element={isLoggedIn ? <AddTrip/> : <Navigate to="/login" replace/>}/>
                <Route path="/my-trips" element={isLoggedIn ? <MyTrips/> : <Navigate to="/login" replace/>}/>
            </Routes>
        </Router>
    );
};

export default App;