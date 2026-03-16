import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../Assets/logo2.png';

const Header = () => {
    return (
        <header>
            <Navbar variant='dark' expand='lg' collapseOnSelect className='navbar'>
                <Container>
                    <NavLink to='/' className='navbar-brand d-flex align-items-center fw-bold fs-4 text-white text-decoration-none'>
                        <img src={logo} alt="YallaDomains" style={{ height: '60px', marginRight: '10px' }} />
                        YallaDomains
                    </NavLink>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />

                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mx-auto px-5'>
                            <NavLink to='/' className={({ isActive }) => (isActive && !window.location.hash) ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                            <a href='/#about' className='nav-link'>About</a>
                            <a href='/#marketplace' className='nav-link'>Forum</a>
                            <a href='/#final-cta' className='nav-link'>Marketplace</a>
                            <a href='/#blog' className='nav-link'>Blog</a>
                        </Nav>

                        <Nav className='align-items-center'>
                            <NavLink to='/login' className='nav-link me-3'>Login</NavLink>
                            <NavLink to='/membership'>
                                <Button className='btn-gold px-4'>Join Now</Button>
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
