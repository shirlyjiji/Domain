import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, InputGroup, Table, Modal, Badge, Spinner } from 'react-bootstrap';
import { FaSearch, FaPlus, FaCheckCircle, FaUserCircle, FaBitcoin, FaLock, FaPaypal } from 'react-icons/fa';
import axios from 'axios';
import '../styles/forum.css';

const JoinForum = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Domain Investing');
    const [message, setMessage] = useState('');

    const fetchThreads = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/forum/threads');
            setThreads(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching threads:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchThreads();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

        if (!userInfo) {
            alert('Please login to post a discussion');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/forum/threads', { 
                title, 
                content: message, 
                category,
                username: userInfo.username // Pass the username to the backend
            }, config);
            setShowModal(false);
            setTitle('');
            setMessage('');
            fetchThreads();
        } catch (error) {
            console.error('Error creating thread:', error);
            alert(error.response && error.response.data.message ? error.response.data.message : error.message);
        }
    };

    const topInvestors = [
        { name: 'DomainPro', rating: '339+', success: '160%', avatar: 'https://i.pravatar.cc/150?u=dp' },
        { name: 'DNKing', rating: '84%', success: '99%', avatar: 'https://i.pravatar.cc/150?u=dnk' },
        { name: 'BrandExpert', rating: '93%', success: '93%', avatar: 'https://i.pravatar.cc/150?u=be' },
    ];

    const filteredThreads = threads.filter(t => {
        const matchesCategory = selectedCategory === 'All Categories' || t.category === selectedCategory;
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="forum-dashboard">
            {/* Forum Banner */}
            <div className="forum-banner">
                <Container>
                    <h1>Investor Discussions</h1>
                    <p>Network and learn from experienced domain investors.</p>
                    <div className="search-container-forum">
                        <InputGroup>
                            <Form.Control 
                                placeholder="Search discussions..." 
                                className="forum-search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button className="forum-search-btn" onClick={() => {}}>
                                <FaSearch className="me-2" /> Search
                            </Button>
                        </InputGroup>
                    </div>
                </Container>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar-forum">
                <Container className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 py-3">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-2">
                        <button 
                            className={selectedCategory === 'All Categories' ? 'btn-filter-forum' : 'btn-filter-forum-outline'}
                            onClick={() => setSelectedCategory('All Categories')}
                        >
                            All Categories
                        </button>
                        <button 
                            className={selectedCategory === 'Domain Investing' ? 'btn-filter-forum' : 'btn-filter-forum-outline'}
                            onClick={() => setSelectedCategory('Domain Investing')}
                        >
                            Investing
                        </button>
                        <button 
                            className={selectedCategory === 'Domain Selling Strategies' ? 'btn-filter-forum' : 'btn-filter-forum-outline'}
                            onClick={() => setSelectedCategory('Domain Selling Strategies')}
                        >
                            Strategies
                        </button>
                        <button 
                            className={selectedCategory === 'Domain Trends' ? 'btn-filter-forum' : 'btn-filter-forum-outline'}
                            onClick={() => setSelectedCategory('Domain Trends')}
                        >
                            Trends
                        </button>
                    </div>
                    <Button className="btn-gold-forum w-40 w-md-auto" onClick={() => setShowModal(true)}>
                        <FaPlus className="me-2" /> Start Discussion
                    </Button>
                </Container>
            </div>

            <Container className="py-4">
                <Row className="g-4">
                    {/* Main Content: Thread Table */}
                    <Col lg={8} md={12}>
                        <div className="forum-table-card">
                            {loading ? (
                                <div className="text-center p-5">
                                    <Spinner animation="border" variant="primary" />
                                    <p className="mt-2">Loading discussions...</p>
                                </div>
                            ) : (
                                <Table responsive className="forum-table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Topic</th>
                                            <th className="text-center d-none d-sm-table-cell">Replies</th>
                                            <th className="text-center d-none d-md-table-cell">Views</th>
                                            <th className="d-none d-sm-table-cell">Last Post</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredThreads.map(thread => (
                                            <tr key={thread._id}>
                                                <td style={{ minWidth: '200px' }}>
                                                    <Link to={`/forum/thread/${thread._id}`} className="topic-title">{thread.title}</Link>
                                                    <div className="topic-meta">
                                                        By <strong>{thread.user ? thread.user.username : 'Anonymous'}</strong> in <span className="text-primary">{thread.category}</span>
                                                        <div className="d-sm-none mt-1">
                                                            <span className="me-2">{thread.replies || 0} replies</span>
                                                            <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center fw-bold d-none d-sm-table-cell">{thread.replies || 0}</td>
                                                <td className="text-center text-muted d-none d-md-table-cell">{thread.views || 0}</td>
                                                <td className="d-none d-sm-table-cell">
                                                    <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{new Date(thread.createdAt).toLocaleDateString()}</div>
                                                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>by {thread.user ? thread.user.username : 'Anonymous'}</div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredThreads.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="text-center p-4">No discussions found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            )}
                        </div>
                    </Col>

                    {/* Sidebar Widgets */}
                    <Col lg={4} md={12}>
                        {/* Top Investors Widget */}
                        <div className="sidebar-widget">
                            <div className="widget-header">Top Domain Sellers</div>
                            {topInvestors.map((investor, idx) => (
                                <div key={idx} className="investor-item">
                                    <img src={investor.avatar} alt={investor.name} className="investor-avatar" />
                                    <div className="investor-info flex-grow-1">
                                        <h6>{investor.name}</h6>
                                        <span>Online for 4 years</span>
                                    </div>
                                    <div className="text-end">
                                        <div className="fw-bold text-success" style={{ fontSize: '0.9rem' }}>{investor.rating}</div>
                                        <Badge bg="success" style={{ fontSize: '0.7rem' }}>{investor.success}</Badge>
                                    </div>
                                </div>
                            ))}
                            <div className="p-3 text-center border-top">
                                <Button variant="link" className="text-decoration-none text-muted small p-0">View All &gt;</Button>
                            </div>
                        </div>

                        {/* Safe Payments Widget (Match marketplace UI) */}
                        <div className="payment-widget-v2 mb-4">
                            <h5 className="fw-bold mb-3">Safe & Secure Payments</h5>
                            <div className="d-flex justify-content-center gap-3 mb-3">
                                <div className="payment-icon-bg"><FaPaypal size={20} /></div>
                                <div className="payment-icon-bg"><FaBitcoin size={20} /></div>
                                <div className="payment-icon-bg"><FaLock size={20} /></div>
                            </div>
                            <p className="small opacity-75 mb-0">We use escrow services to ensure secure transactions for all members.</p>
                        </div>

                        {/* Investor Discussions Widget */}
                        <div className="investor-discussions-widget">
                            <div className="widget-overlay">
                                <h3>Forum: Investor Discussions</h3>
                                <p>Join the Conversation</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* New Discussion Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Start New Discussion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Thread Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="e.g. Best domain extensions in 2026" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Category</Form.Label>
                            <Form.Select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>Domain Investing</option>
                                <option>Domain Selling Strategies</option>
                                <option>Domain Trends</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Message</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={5} 
                                placeholder="What would you like to discuss?" 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="btn-gold-forum w-100 py-2 mt-2">Post Discussion</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default JoinForum;
