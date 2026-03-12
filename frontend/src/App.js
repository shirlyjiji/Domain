import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import ForumScreen from './screens/ForumScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
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
                    <Route path='/marketplace' element={<Container className='py-3'><MarketplaceScreen /></Container>} />
                    <Route path='/forum' element={<Container className='py-3'><ForumScreen /></Container>} />
                    <Route path='/join-forum' element={<JoinForum />} />
                    <Route path='/register' element={<Container className='py-3'><RegisterScreen /></Container>} />
                    <Route path='/profile' element={<Container className='py-3'><ProfileScreen /></Container>} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
