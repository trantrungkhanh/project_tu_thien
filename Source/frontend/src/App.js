import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './component/sign-in-side/SignInSide';
import SignUp from './component/sign-up/SignUp';
import Management from './component/dashboard/Dashboard'
import Home_v2 from './component/Home'
import HomeAdmin from './component/dashboard/Dashboard'
import { useColorScheme } from '@mui/material/styles';
import Page403 from './component/error/Page403';

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const { setMode } = useColorScheme();
    React.useEffect(() => {
        setMode('light'); 
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, [setMode]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home" element={<Home_v2 />} />
                <Route path="/campaign-detail/:campaignId" element={<Home_v2 />} />
                <Route path="/profile-edit/:accountId" element={<Home_v2 />} />
                <Route path="/donate-history/:accountId" element={<Home_v2 />} />
                <Route path="/campaign-donate/:campaignId" element={<Home_v2 />} />
                <Route path="/management/:id" element={isLoggedIn ? <Management /> :  <Navigate to="/sign-in" />}/>
                <Route path="/" element={<Home_v2 />} />
                <Route path="/home-admin" element={<HomeAdmin />} />
                <Route path="/campaign-management/:accountId" element={<Home_v2 />} />
                <Route path="/campaign-timeline/:accountId" element={<Home_v2 />} />
                <Route path="/403" element={<Page403 />} />
            </Routes>
        </Router>
    );
}

export default App;
