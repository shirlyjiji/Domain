import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../Assets/logo2.png';
import {
    FaGlobeAmericas, FaYoutube, FaFacebook, FaTwitter, FaLinkedin,
    FaEnvelope, FaUniversity, FaMapMarkerAlt, FaHome, FaLightbulb,
    FaUsers, FaArrowAltCircleUp, FaFolderOpen, FaRss, FaWhatsapp,
    FaTelegramPlane, FaDiscord, FaReddit, FaHeadset, FaLifeRing,
    FaQuestionCircle, FaGavel, FaUserShield, FaBullhorn, FaSitemap,
    FaArrowUp
} from 'react-icons/fa';

const Footer = () => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const checkScrollTop = () => {
            if (!showScroll && window.pageYOffset > 400) {
                setShowScroll(true);
            } else if (showScroll && window.pageYOffset <= 400) {
                setShowScroll(false);
            }
        };

        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScroll]);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className='footer-advanced'>
            <Container>
                <Row className='g-5'>
                    {/* Brand & Corporate Info */}
                    <Col lg={4} md={6}>
                        <NavLink to='/' className='footer-logo d-flex align-items-center'>
                            <img src={logo} alt="YallaDomains" style={{ height: '60px', marginRight: '10px' }} />
                            YallaDomains
                        </NavLink>
                        <div className='social-links-grid'>
                            <a href='#'><FaYoutube /></a>
                            <a href='#'><FaFacebook /></a>
                            <a href='#'><FaTwitter /></a>
                            <a href='#'><FaLinkedin /></a>
                        </div>
                        <ul className='contact-info-list'>
                            <li><FaEnvelope size={18} /> hello@yalladomains.com</li>
                            <li><FaUniversity size={18} /> <div><strong>Yalla Domains Ltd</strong><br />Company Number: 12629117<br />Registration address: 38 Portside View, Chatham, ME4 4FY, UK</div></li>
                            <li><FaMapMarkerAlt size={18} /> <div><strong>UK Office:</strong> Suite M6, Old Library, St Faith Street, Maidstone, ME14 1LH, UK</div></li>
                            <li><FaMapMarkerAlt size={18} /> <div><strong>Latvia Office:</strong> Doma Laukums 2, Rīga, LV-1050, Latvia</div></li>
                            <li><FaMapMarkerAlt size={18} /> <div><strong>Nepal Office:</strong> Coming Soon</div></li>
                        </ul>
                    </Col>

                    {/* Navigation */}
                    <Col lg={2} md={6}>
                        <h5>Navigation</h5>
                        <ul className='footer-nav-list'>
                            <li><a href='/'><FaHome /> Home</a></li>
                            <li><a href='/#about'><FaUsers /> About</a></li>
                            <li><a href='/#marketplace'><FaRss /> Forum</a></li>
                            <li><a href='/#final-cta'><FaArrowAltCircleUp /> Marketplace</a></li>
                            <li><a href='/#blog'><FaLightbulb /> Blog</a></li>
                        </ul>
                    </Col>

                    {/* Social & Marketplace Groups */}
                    <Col lg={3} md={6}>
                        <h5>Social Groups</h5>
                        <p className='small opacity-75 mb-3'>Connect & Collaborate</p>
                        <div className='social-group-grid mb-4'>
                            <a href='#'><FaLinkedin /> LinkedIn</a>
                            <a href='#'><FaWhatsapp /> WhatsApp</a>
                            <a href='#'><FaTelegramPlane /> Telegram</a>
                            <a href='#'><FaFacebook /> Facebook</a>
                            <a href='#'><FaDiscord /> Discord</a>
                            <a href='#'><FaReddit /> Reddit</a>
                        </div>

                        <h5>Marketplace Groups</h5>
                        <div className='social-group-grid'>
                            <a href='#'><FaWhatsapp /> WhatsApp</a>
                            <a href='#'><FaTelegramPlane /> Telegram</a>
                            <a href='#'><FaFacebook /> Facebook</a>
                        </div>
                    </Col>

                    {/* Support & Extras */}
                    <Col lg={3} md={6}>
                        <h5>Support</h5>
                        <ul className='footer-nav-list mb-4'>
                            <li><NavLink to='/contact'><FaHeadset /> Contact us</NavLink></li>
                            <li><NavLink to='/support'><FaLifeRing /> Support</NavLink></li>
                            <li><NavLink to='/help'><FaQuestionCircle /> Help</NavLink></li>
                            <li><NavLink to='/terms'><FaGavel /> Terms and rules</NavLink></li>
                            <li><NavLink to='/privacy'><FaUserShield /> Privacy policy</NavLink></li>
                        </ul>

                        <h5>Extras</h5>
                        <ul className='footer-nav-list'>
                            <li><NavLink to='/feedback'><FaBullhorn /> Feedback</NavLink></li>
                            <li><NavLink to='/sitemap'><FaSitemap /> Sitemap</NavLink></li>
                            <li><NavLink to='/rss'><FaRss /> RSS</NavLink></li>
                        </ul>
                    </Col>
                </Row>

                <div className='footer-bottom-bar'>
                    <p>YallaDomains.com AKA YD © 2001-2025 | Managed by Yalla Domains Ltd</p>
                </div>
            </Container>

            {/* Scroll to Top Button */}
            <button
                className={`scroll-to-top ${showScroll ? 'show' : ''}`}
                onClick={scrollTop}
                aria-label="Scroll to top"
            >
                <FaArrowUp />
            </button>
        </footer>
    );
};

export default Footer;
