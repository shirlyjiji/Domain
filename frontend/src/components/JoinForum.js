import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Table, Modal, Badge, Spinner } from 'react-bootstrap';
import { FaSearch, FaPlus, FaCheckCircle, FaUserCircle, FaBitcoin, FaLock, FaPaypal } from 'react-icons/fa';
import axios from 'axios';
import '../styles/forum.css';

const JoinForum = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Domain Investing');
    const [message, setMessage] = useState('');

    const fetchThreads = async () => {
        try {
            const { data } = await axios.get('/api/forum/threads');
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

            await axios.post('/api/forum/threads', { title, content: message, category }, config);
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

    const filteredThreads = selectedCategory === 'All Categories' 
        ? threads 
        : threads.filter(t => t.category === selectedCategory);

    return (
        <div className="forum-dashboard">
            {/* Filter Bar */}
            <div className="filter-bar-forum">
                <Container className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
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
                            Domain Investing
                        </button>
                        <button 
                            className={selectedCategory === 'Domain Selling Strategies' ? 'btn-filter-forum' : 'btn-filter-forum-outline'}
                            onClick={() => setSelectedCategory('Domain Selling Strategies')}
                        >
                            Selling Strategies
                        </button>
                        <button 
                            className={selectedCategory === 'Domain Trends' ? 'btn-filter-forum' : 'btn-filter-forum-outline'}
                            onClick={() => setSelectedCategory('Domain Trends')}
                        >
                            Domain Trends
                        </button>
                    </div>
                    <Button className="btn-gold-forum" onClick={() => setShowModal(true)}>
                        <FaPlus className="me-2" /> Start New Discussion
                    </Button>
                </Container>
            </div>

            <Container className="py-4">
                <Row>
                    {/* Main Content: Thread Table */}
                    <Col lg={8}>
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
                                            <th className="text-center">Replies</th>
                                            <th className="text-center">Views</th>
                                            <th>Last Post</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredThreads.map(thread => (
                                            <tr key={thread._id}>
                                                <td style={{ width: '50%' }}>
                                                    <a href="#" className="topic-title">{thread.title}</a>
                                                    <div className="topic-meta">
                                                        By <strong>{thread.user ? thread.user.username : 'Anonymous'}</strong> in <span className="text-primary">{thread.category}</span>
                                                    </div>
                                                </td>
                                                <td className="text-center fw-bold">0</td>
                                                <td className="text-center text-muted">0</td>
                                                <td>
                                                    <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{new Date(thread.createdAt).toLocaleDateString()}</div>
                                                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>by {thread.user ? thread.user.username : 'Anonymous'}</div>
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
                    <Col lg={4}>
                        {/* Top Investors Widget */}
                        <div className="sidebar-widget">
                            <div className="widget-header">Top Investors</div>
                            {topInvestors.map((investor, idx) => (
                                <div key={idx} className="investor-item">
                                    <img src={investor.avatar} alt={investor.name} className="investor-avatar" />
                                    <div className="investor-info flex-grow-1">
                                        <h6>{investor.name}</h6>
                                        <span>Investor since 2022</span>
                                    </div>
                                    <div className="text-end">
                                        <div className="fw-bold text-success" style={{ fontSize: '0.9rem' }}>{investor.rating}</div>
                                        <Badge bg="success" style={{ fontSize: '0.7rem' }}>{investor.success}</Badge>
                                    </div>
                                </div>
                            ))}
                            <div className="p-3 text-center">
                                <Button variant="link" className="text-decoration-none text-muted small p-0">View All Investors &gt;</Button>
                            </div>
                        </div>

                        {/* Popular Discussions Widget */}
                        <div className="sidebar-widget">
                            <div className="widget-header">Popular Discussions</div>
                            <a href="#" className="popular-discussion-item">.AI domain market demand</a>
                            <a href="#" className="popular-discussion-item">Domain flipping tips for beginners</a>
                            <a href="#" className="popular-discussion-item">Best marketplaces to sell fast</a>
                            <a href="#" className="popular-discussion-item">How to appraise premium domains</a>
                        </div>

                        {/* Safe Payments Widget (Match marketplace UI) */}
                        <div className="payment-widget">
                            <h5 className="fw-bold mb-3">Safe & Secure Payments</h5>
                            <div className="d-flex justify-content-center gap-3 mb-3">
                                <FaPaypal size={24} />
                                <FaBitcoin size={24} />
                                <FaLock size={24} />
                            </div>
                            <p className="small opacity-75 mb-0">We use escrow services to ensure secure transactions for all members.</p>
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
