import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import JoinForum from './components/JoinForum';
import { useLocation } from 'react-router-dom';

const HeaderWrapper = () => {
    const location = useLocation();
    const hideHeaderPaths = ['/join-forum'];
    return hideHeaderPaths.includes(location.pathname) ? null : <Header />;
};

const App = () => {
    return (
        <Router>
            <HeaderWrapper />
            <main>
                <Routes>
                    <Route path='/' element={<HomeScreen />} />
                    <Route path='/join-forum' element={<JoinForum />} />
                  
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
