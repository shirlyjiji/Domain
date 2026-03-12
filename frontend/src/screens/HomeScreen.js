import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container, Card, Accordion, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaCheck, FaShoppingCart, FaChartLine, FaComments, FaStar, FaQuoteRight, FaArrowLeft, FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHome, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdVerified, MdWorkspacePremium } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { HiUserGroup } from 'react-icons/hi';
import domainImage from '../Assets/image7.jpg';
import heroBackground from '../Assets/hero.jpg';
import '../styles/style.css';
const HomeScreen = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "Portfolio Manager",
            text: "Sold my premium 3-letter domain for $45,000! YallaDomains facilitated a secure transaction and provided amazing support throughout the escrow process.",
            stars: 5,
            image: "https://i.pravatar.cc/150?u=sarah"
        },
        {
            name: "Marcus Thorne",
            role: "Tech Entrepreneur",
            text: "I've tried many marketplaces, but the quality of buyers here is unmatched. It's truly the go-to platform for serious domain investors seeking premium assets.",
            stars: 5,
            image: "https://i.pravatar.cc/150?u=marcus"
        },
        {
            name: "Elena Rodriguez",
            role: "Domain Investor",
            text: "The appraisal tools and market insights gave me the edge I needed to build a profitable portfolio. The platform's interface is intuitive and efficient.",
            stars: 4,
            image: "https://i.pravatar.cc/150?u=elena"
        },
        {
            name: "David West",
            role: "Independent Broker",
            text: "Found highly responsive buyers for my corporate listings within 48 hours. The community here is professional and very active. Simply the best.",
            stars: 5,
            image: "https://i.pravatar.cc/150?u=david"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section
                className='hero-section'
                style={{
                    backgroundImage: `url(${heroBackground})`,
                    backgroundColor: '#2C3E50',
                    backgroundBlendMode: 'multiply',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <Container>
                    <h1 className='display-3 fw-bold mb-4 mt-5' data-aos="fade-up">
                        Join the Exclusive Domain Investor Community
                    </h1>
                    <p className='lead mb-5 mx-auto opacity-75' style={{ maxWidth: '800px' }} >
                        Network with the Best, Access Premium Domain Deals, and Grow Your Portfolio.
                    </p>
                    <LinkContainer to='/membership'>
                        <Button className='btn-gold btn-lg px-5' data-aos="fade-left" data-aos-delay="200">Get Started Today</Button>
                    </LinkContainer>
                </Container>
            </section>

            {/* Feature Bar */}
            <Container >
                <Row className='feature-bar text-center rounded-2' style={{ backgroundColor: '#2C3E50' }}>
                    <Col lg={3} md={6} className='feature-item'>
                        <MdVerified className='fs-3' style={{ color: '#3498DB' }} />
                        <span className='fw-semibold'>Verified Investors</span>
                    </Col>
                    <Col lg={3} md={6} className='feature-item'>
                        <MdWorkspacePremium className='fs-3' style={{ color: '#3498DB' }} />
                        <span className='fw-semibold'>Exclusive Deals</span>
                    </Col>
                    <Col lg={3} md={6} className='feature-item'>
                        <RiLockPasswordLine className='fs-3' style={{ color: '#3498DB' }} />
                        <span className='fw-semibold'>Private Marketplace</span>
                    </Col>
                    <Col lg={3} md={6} className='feature-item'>
                        <HiUserGroup className='fs-3' style={{ color: '#3498DB' }} />
                        <span className='fw-semibold'>Premium Networking</span>
                    </Col>
                </Row>
            </Container>

            {/* About Us Section */}
            <section id='about' className='about-section'>
                <Container>
                    <Row className='align-items-center'>
                        <Col lg={6} data-aos="fade-right">
                            <div className='about-image-wrapper'>
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                                    alt="About YallaDomains"
                                    className='about-img'
                                />
                                <div className='review-badge'>
                                    <div className='review-score'>4.8/5</div>
                                    <div className='review-avatars'>
                                        <img src="https://i.pravatar.cc/150?u=1" alt="u1" className='review-avatar' />
                                        <img src="https://i.pravatar.cc/150?u=2" alt="u2" className='review-avatar' />
                                        <img src="https://i.pravatar.cc/150?u=3" alt="u3" className='review-avatar' />
                                    </div>
                                    <div className='review-text'>Client Review</div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} data-aos="fade-left">
                            <div className='about-content ps-lg-5'>
                                <div className='about-sub'>ABOUT US</div>
                                <h2 className='about-title'>Accelerate Your Domain Success With YallaDomains</h2>
                                <p className='about-p'>
                                    We help you unlock your domain portfolio's full potential. Through personalized strategies, expert guidance, and actionable insights, we bridge the gap between your assets and global investors.
                                </p>

                                <div className='mission-item'>
                                    <div className='mission-icon'><HiUserGroup /></div>
                                    <div className='mission-content'>
                                        <h5>Our Vision</h5>
                                        <p>To empower domainers and businesses to achieve their fullest potential through transformative insights, fostering growth and success.</p>
                                    </div>
                                </div>

                                <div className='mission-item'>
                                    <div className='mission-icon'><MdVerified /></div>
                                    <div className='mission-content'>
                                        <h5>Our Mission</h5>
                                        <p>To provide a secure, transparent, and efficient marketplace for high-performance digital assets and domain investments.</p>
                                    </div>
                                </div>

                                <div className='about-btns'>
                                    <Button className='btn-learn-more'>Learn More</Button>
                                    <button className='btn-icon-outline'><FaArrowRight /></button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Membership Plans */}
            <section className='membership-section py-4 py-md-5 my-2 my-md-5'>
                <Container>
                    <div className='about-sub' data-aos="fade-up">MEMBERSHIP</div>
                    <h2 className='about-title mb-2' data-aos="fade-left" data-aos-delay="100">Our Membership Plans</h2>
                    <p className='about-new-title mb-4'>Choose the Right Plan for You</p>
                    <Row className='g-4' data-aos="fade-up" data-aos-delay="300">
                        <Col lg={3} md={6}>
                            <Card className='pricing-card h-100'>
                                <div className='pricing-header premium'>Premium</div>
                                <Card.Body className='text-center'>
                                    <div className='price-tag'>$10<span>/month</span></div>
                                    <ul className='membership-list text-start ps-4'>
                                        <li><FaCheck className='text-success me-2' /> Forum Access</li>
                                        <li><FaCheck className='text-success me-2' /> Basic Deals</li>
                                    </ul>
                                    <Button className='btn-gold w-100 mt-3'>Join Now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} md={6}>
                            <Card className='pricing-card h-100'>
                                <div className='pricing-header investor'>Investor</div>
                                <Card.Body className='text-center'>
                                    <div className='price-tag'>$50<span>/month</span></div>
                                    <ul className='membership-list text-start ps-4'>
                                        <li><FaCheck className='text-success me-2' /> Full Access</li>
                                        <li><FaCheck className='text-success me-2' /> Premium Listings</li>
                                    </ul>
                                    <Button className='btn-gold w-100 mt-3'>Join Now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} md={6}>
                            <Card className='pricing-card h-100'>
                                <div className='pricing-header company'>Company</div>
                                <Card.Body className='text-center'>
                                    <div className='price-tag'>$100<span>/month</span></div>
                                    <ul className='membership-list text-start ps-4'>
                                        <li><FaCheck className='text-success me-2' /> Featured Profiles</li>
                                        <li><FaCheck className='text-success me-2' /> Business Promotions</li>
                                    </ul>
                                    <Button className='btn-gold w-100 mt-3'>Join Now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} md={6}>
                            <Card className='pricing-card h-100'>
                                <div className='pricing-header advertiser'>Advertiser</div>
                                <Card.Body className='text-center'>
                                    <div className='price-tag'>$50<span>/month</span></div>
                                    <ul className='membership-list text-start ps-4'>
                                        <li><FaCheck className='text-success me-2' /> Banner Ads</li>
                                        <li><FaCheck className='text-success me-2' /> Sponsored Threads</li>
                                    </ul>
                                    <Button className='btn-gold w-100 mt-3'>Join Now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Buy, Sell & Discuss */}
            <section id='marketplace' className='buy-sell-discuss-section'>
                <Container data-aos="zoom-in">
                    <h2 className='section-title'>Buy, Sell & Discuss Domains</h2>
                    <div className='title-underline'></div>

                    <div className='buy-sell-box'>
                        <div className='buy-sell-content'>
                            <div className='buy-sell-col'>
                                <div>
                                    <h4>Marketplace</h4>
                                    <p>The premier marketplace to securely buy and sell domain names with trusted services.</p>
                                </div>
                                <Button className='buy-sell-btn'>View Listings</Button>
                            </div>
                            <div className='buy-sell-col'>
                                <div>
                                    <h4>Domain Appraisals</h4>
                                    <p>Professional domain valuation services to help you understand the true market value of your digital assets.</p>
                                </div>
                                <Button className='buy-sell-btn'>Request Appraisal</Button>
                            </div>
                            <div className='buy-sell-col'>
                                <div>
                                    <h4>Investor Discussions</h4>
                                    <p>Join a vibrant community of elite domain investors to share insights, network, and grow your portfolio.</p>
                                </div>
                                <LinkContainer to='/join-forum'>
                                    <Button className='buy-sell-btn'>Join the Forum</Button>
                                </LinkContainer>
                            </div>
                        </div>
                        <div className='buy-sell-image-container d-none d-lg-block'>
                            <img
                                src={domainImage}
                                alt="Professionals"
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Success Stories */}
            <section className='success-stories'>
                <Container data-aos="fade-up">
                    <div className='testimonial-header'>
                        <div>
                            <div className='testimonial-sub'>Success Stories </div>
                            <h2 className='testimonial-title'>Latest Clients Feedback</h2>
                        </div>
                        <div className='carousel-nav d-none d-md-flex'>
                            <button onClick={handlePrev} className={`nav-btn ${activeIndex % 2 === 0 ? 'active' : ''}`}>
                                <FaArrowLeft />
                            </button>
                            <button onClick={handleNext} className={`nav-btn ${activeIndex % 2 !== 0 ? 'active' : ''}`}>
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>

                    <div className='testimonial-wrapper' style={{ overflow: 'hidden', padding: '10px 0 50px' }}>
                        <div
                            className='testimonial-container'
                            style={{
                                transform: `translateX(-${activeIndex * (100 / (windowWidth < 768 ? 1 : windowWidth < 992 ? 2 : 3))}%)`
                            }}
                        >
                            {[...testimonials, ...testimonials].map((t, i) => (
                                <div className='success-card' key={i}>
                                    <div className='testimonial-avatar-wrapper'>
                                        <img src={t.image} alt={t.name} className='testimonial-avatar' />
                                    </div>
                                    <div className='star-rating'>
                                        {[...Array(5)].map((_, idx) => (
                                            <FaStar key={idx} opacity={idx < t.stars ? 1 : 0.3} />
                                        ))}
                                    </div>
                                    <p className='testimonial-text'>{t.text}</p>
                                    <div className='testimonial-footer'>
                                        <div className='user-info'>
                                            <h5>{t.name}</h5>
                                            <span>{t.role}</span>
                                        </div>
                                        <FaQuoteRight className='quote-icon' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* FAQ Section */}
            <section id='faq' className='faq-section py-4 py-md-5'>
                <Container>
                    <div className='about-sub' data-aos="fade-up">FAQs</div>
                    <h2 className='about-title' data-aos="fade-left">Questions About Our Marketplace</h2>

                    <Row className='mt-3 mt-md-5 g-4'>
                        <Col lg={6} data-aos="fade-up">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>How do I list my domain for sale?</Accordion.Header>
                                    <Accordion.Body>
                                        To list your domain, simply create an account, navigate to the Marketplace section, and click on 'Add Listing'. Provide your domain details, set a price, and your listing will be live after a brief verification.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>What are the transaction fees on YallaDomains?</Accordion.Header>
                                    <Accordion.Body>
                                        We charge a competitive flat commission of 10% on successful sales. There are no hidden listing fees, and standard members can list their domains for free.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>How does the secure escrow process work?</Accordion.Header>
                                    <Accordion.Body>
                                        Once a buyer agrees to a price, their funds are held in our secure escrow account. We notify you to initiate the domain transfer, and funds are released to you only after the buyer confirms receipt of the domain.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Can I list domains with any extension (TLD)?</Accordion.Header>
                                    <Accordion.Body>
                                        Yes, we support all major extensions including .com, .net, .org, as well as new gTLDs and country-code extensions (ccTLDs) like .ae, .sa, and .io.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col lg={6} data-aos="fade-up" data-aos-delay="200">
                            <Accordion>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>How long does a domain transfer typically take?</Accordion.Header>
                                    <Accordion.Body>
                                        Most transfers are completed within 1 to 7 days, depending on the registrars involved. Our dedicated support team monitors every transaction to ensure a smooth and timely handover.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5">
                                    <Accordion.Header>Why should I get a professional domain appraisal?</Accordion.Header>
                                    <Accordion.Body>
                                        A professional appraisal helps you understand the true market value of your asset based on length, keywords, and comparable historical sales, ensuring you don't leave money on the table.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="6">
                                    <Accordion.Header>How do I receive payments after a sale?</Accordion.Header>
                                    <Accordion.Body>
                                        After the escrow process is complete, you can withdraw your funds via Bank Transfer, PayPal, or Payoneer. Payments are typically processed within 24-48 business hours.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="7">
                                    <Accordion.Header>Are buyers on this platform verified?</Accordion.Header>
                                    <Accordion.Body>
                                        Yes, we perform identity and payment verification on our investors to maintain a high-quality community and reduce the risk of fraudulent offers or failed transactions.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Final CTA */}
            <section id='final-cta' className='cta-section text-center'>
                <Container >
                    <h2 className='mb-3'>Ready To Sell Your Premium Domain?</h2>
                    <p className='cta-paragraph'>Let's collaborate to develop strategies, reach elite investors, and achieve your portfolio growth goals together.</p>
                    <LinkContainer to='/membership'>
                        <Button className='btn-cta-gold'>Get Started Now</Button>
                    </LinkContainer>
                </Container>
            </section>
            {/* Explore Latest News (Blog Section) */}
            <section id='blog' className='blog-section'>
                <Container>
                    <div className='blog-header' data-aos="fade-up">
                        <div>
                            <div className='blog-sub'>Our Blog</div>
                            <h2 className='blog-main-title'>Explore Latest News</h2>
                        </div>
                        <LinkContainer to='/news'>
                            <Button className='btn-see-all'>See All More <FaArrowRight /></Button>
                        </LinkContainer>
                    </div>

                    <Row className='g-4 mt-2' data-aos="fade-up" data-aos-delay="200">
                        {/* Blog Post 1 */}
                        <Col lg={4} md={6}>
                            <div className='blog-card'>
                                <div className='blog-image-wrapper'>
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Market Analysis" />
                                </div>
                                <div className='blog-content'>
                                    <div className='card-meta'>
                                        <span className='category-badge'>Market Tips</span>
                                        <span className='post-date'>June 12, 2024</span>
                                    </div>
                                    <h4 className='post-title'>Top 10 Domain Selling Mistakes To Avoid For A Seamless Sale</h4>
                                    <div className='blog-card-divider'></div>
                                    <div className='blog-footer'>
                                        <div className='author-info'>
                                            <img src="https://i.pravatar.cc/150?u=author1" alt="Author" className='author-avatar' />
                                            <div className='author-details'>
                                                <p>Hostech</p>
                                                <span>By Author</span>
                                            </div>
                                        </div>
                                        <div className='arrow-link'><FaArrowRight /></div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Blog Post 2 */}
                        <Col lg={4} md={6}>
                            <div className='blog-card'>
                                <div className='blog-image-wrapper'>
                                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Investments" />
                                </div>
                                <div className='blog-content'>
                                    <div className='card-meta'>
                                        <span className='category-badge'>Investing</span>
                                        <span className='post-date'>June 12, 2024</span>
                                    </div>
                                    <h4 className='post-title'>The Importance Of Reliable Appraisals For Your Online Business</h4>
                                    <div className='blog-card-divider'></div>
                                    <div className='blog-footer'>
                                        <div className='author-info'>
                                            <img src="https://i.pravatar.cc/150?u=author2" alt="Author" className='author-avatar' />
                                            <div className='author-details'>
                                                <p>Hostech</p>
                                                <span>By Author</span>
                                            </div>
                                        </div>
                                        <div className='arrow-link'><FaArrowRight /></div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Blog Post 3 */}
                        <Col lg={4} md={12}>
                            <div className='blog-card'>
                                <div className='blog-image-wrapper'>
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Cloud/Domain Security" />
                                </div>
                                <div className='blog-content'>
                                    <div className='card-meta'>
                                        <span className='category-badge'>Strategy</span>
                                        <span className='post-date'>June 12, 2024</span>
                                    </div>
                                    <h4 className='post-title'>Domain Selling Guide Everything You Need To Know Securely</h4>
                                    <div className='blog-card-divider'></div>
                                    <div className='blog-footer'>
                                        <div className='author-info'>
                                            <img src="https://i.pravatar.cc/150?u=author3" alt="Author" className='author-avatar' />
                                            <div className='author-details'>
                                                <p>Hostech</p>
                                                <span>By Author</span>
                                            </div>
                                        </div>
                                        <div className='arrow-link'><FaArrowRight /></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Contact Us Section */}
            <section id='contact' className='contact-section-new'>
                <Container fluid className="px-0">
                    <Row className="g-0">
                        <Col lg={7} className="contact-left-col">
                            <div className="contact-content-wrapper py-4 py-md-0">
                                <div className="contact-breadcrumb mb-3">
                                    <FaHome className="me-2" style={{ color: '#f39c12' }} /> Contact Us
                                </div>
                                <h2 className='contact-main-title mb-3 mb-md-4'>Get In Touch With YallaDomains</h2>
                                <p className='contact-desc mb-4 mb-md-5'>
                                    Have questions about selling your premium domain or our membership plans? Our dedicated support team is here to help you through every step of the process.
                                </p>
                                <Form className='contact-form-new'>
                                    <Row className="g-3">
                                        <Col md={6} xs={12}>
                                            <Form.Control type='text' placeholder='First Name' className="contact-input" />
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <Form.Control type='text' placeholder='Last Name' className="contact-input" />
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Control type='email' placeholder='Email address' className="contact-input" />
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Control as='textarea' rows={5} placeholder='How can we help you today?' className="contact-input" />
                                        </Col>
                                    </Row>
                                    <Button className='btn-submit-orange mt-3 mt-md-4'>
                                        Send Message
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                        <Col lg={5} className="contact-right-col" >
                            <div className="contact-info-container py-4 py-md-0">
                                <div className='contact-dark-card' data-aos="fade-left" data-aos-delay="200">
                                    <div className='contact-method-new'>
                                        <div className='contact-icon-box'><FaPhone /></div>
                                        <div className='contact-info-text'>
                                            <h5>Contact Number</h5>
                                            <p>+1 (555) 123-4567</p>
                                        </div>
                                    </div>

                                    <div className='contact-method-new'>
                                        <div className='contact-icon-box'><FaEnvelope /></div>
                                        <div className='contact-info-text'>
                                            <h5>Email Support</h5>
                                            <p>support@yalladomains.com</p>
                                        </div>
                                    </div>

                                    <div className='contact-method-new'>
                                        <div className='contact-icon-box'><FaMapMarkerAlt /></div>
                                        <div className='contact-info-text'>
                                            <h5>Office Location</h5>
                                            <p>Dubai Internet City, UAE</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='social-links-contact'>
                                    <a href="#" className="social-icon-btn"><FaFacebookF /></a>
                                    <a href="#" className="social-icon-btn"><FaXTwitter /></a>
                                    <a href="#" className="social-icon-btn"><FaLinkedinIn /></a>
                                    <a href="#" className="social-icon-btn"><FaInstagram /></a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div >
    );
};

export default HomeScreen;
