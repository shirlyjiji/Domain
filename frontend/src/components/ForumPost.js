import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Breadcrumb } from 'react-bootstrap';
import { FaUserCircle, FaClock, FaEye, FaReply, FaShare, FaBookmark, FaArrowLeft, FaChevronUp, FaChevronDown, FaThumbsUp, FaHandsHelping, FaCommentDots } from 'react-icons/fa';
import axios from 'axios';
import '../styles/forum.css';

const ForumPost = () => {
    const { id } = useParams();
    const replyRef = useRef(null);
    const textareaRef = useRef(null);
    const lastId = useRef(null);
    const [thread, setThread] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [replies, setReplies] = useState([]);
    const [similarThreads, setSimilarThreads] = useState([]);
    const [newReply, setNewReply] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const scrollToReply = (quoteUser = null) => {
        replyRef.current?.scrollIntoView({ behavior: 'smooth' });
        if (quoteUser) {
            setNewReply(`@${quoteUser} `);
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 500);
        }
    };

    const fetchReplies = async (title) => {
        if (!title) return;
        try {
            const { data } = await axios.get(`/api/messages/${encodeURIComponent(title)}`);
            setReplies(data);
        } catch (err) {
            console.error('Error fetching replies:', err);
        }
    };

    const fetchSimilarThreads = async (threadId) => {
        try {
            const { data } = await axios.get(`/api/forum/threads/${threadId}/similar`);
            setSimilarThreads(data);
        } catch (err) {
            console.error('Error fetching similar threads:', err);
        }
    };

    useEffect(() => {
        const fetchThread = async () => {
            if (!id) {
                setError('No thread ID provided');
                setLoading(false);
                return;
            }

            if (lastId.current === id) return;
            lastId.current = id;

            try {
                const { data } = await axios.get(`/api/forum/threads/${id}`);
                setThread(data);
                fetchSimilarThreads(id);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching thread:', err);
                const message = err.response && err.response.data.message 
                    ? err.response.data.message 
                    : err.message;
                setError(message);
                setLoading(false);
            }
        };

        fetchThread();
    }, [id]);

    useEffect(() => {
        if (thread && thread.title) {
            fetchReplies(thread.title);
        }
    }, [thread]);

    const handlePostReply = async () => {
        if (!newReply.trim()) return;
        setSubmitting(true);
        try {
            const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
            const payload = {
                domainName: thread.title,
                sender: {
                    name: userInfo?.username || 'GuestUser',
                    avatar: `https://i.pravatar.cc/150?u=${userInfo?.username || 'guest'}`,
                    role: userInfo?.isAdmin ? 'Admin' : 'Buyer'
                },
                content: newReply
            };
            
            await axios.post('/api/messages', payload);
            setNewReply('');
            await fetchReplies(thread.title);
        } catch (err) {
            console.error('Error posting reply:', err);
            alert('Failed to post reply. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleVote = async (targetId, type, direction) => {
        try {
            const endpoint = type === 'thread' ? `/api/forum/threads/${targetId}/vote` : `/api/messages/${targetId}/vote`;
            const { data } = await axios.patch(endpoint, { direction });
            if (type === 'thread') {
                setThread(data);
            } else {
                setReplies(replies.map(r => r._id === targetId ? data : r));
            }
        } catch (err) {
            console.error('Error voting:', err);
        }
    };

    const handleLike = async (targetId, type) => {
        try {
            const endpoint = type === 'thread' ? `/api/forum/threads/${targetId}/like` : `/api/messages/${targetId}/like`;
            const { data } = await axios.patch(endpoint);
            if (type === 'thread') {
                setThread(data);
            } else {
                setReplies(replies.map(r => r._id === targetId ? data : r));
            }
        } catch (err) {
            console.error('Error liking:', err);
        }
    };

    const handleThank = async (targetId, type) => {
        try {
            const endpoint = type === 'thread' ? `/api/forum/threads/${targetId}/thank` : `/api/messages/${targetId}/thank`;
            const { data } = await axios.patch(endpoint);
            if (type === 'thread') {
                setThread(data);
            } else {
                setReplies(replies.map(r => r._id === targetId ? data : r));
            }
        } catch (err) {
            console.error('Error thanking:', err);
        }
    };

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading discussion...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <div className="alert alert-danger">{error}</div>
                <Link to="/join-forum" className="btn btn-primary">
                    <FaArrowLeft className="me-2" /> Back to Forum
                </Link>
            </Container>
        );
    }

    return (
        <div className="forum-post-page" style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', paddingBottom: '50px' }}>
            {/* Header Banner */}
            <div className="forum-banner py-4 mb-4">
                <Container>
                    <Breadcrumb className="custom-breadcrumb mb-3">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }} className="text-white text-decoration-none">Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/join-forum" }} className="text-white text-decoration-none">Forum</Breadcrumb.Item>
                        
                    </Breadcrumb>
                    <h1 className="text-white fw-bold fs-3 fs-md-1">{thread.title}</h1>
                </Container>
            </div>

            <Container>
                <Row className="g-4">
                    <Col lg={9} md={12}>
                        {/* Main Post */}
                        <Card className="border-0 shadow-sm mb-4 overflow-hidden forum-card-custom">
                            <Row className="g-0">
                                {/* User Sidebar - Responsive */}
                                <Col md={3} xs={12} className="bg-light border-end text-center py-3 py-md-4">
                                    <div className="d-flex flex-md-column align-items-center justify-content-center px-3">
                                        <div className="mb-2 mb-md-3 position-relative d-inline-block">
                                            <FaUserCircle size={60} className="text-secondary opacity-50 d-md-none" />
                                            <FaUserCircle size={80} className="text-secondary opacity-50 d-none d-md-block" />
                                            <div className="status-indicator online"></div>
                                        </div>
                                        <div className="ms-3 ms-md-0">
                                            <h5 className="fw-bold text-dark mb-1">{thread.user?.username || 'Anonymous'}</h5>
                                            <div className="d-flex flex-wrap justify-content-center gap-1 mb-2">
                                                <Badge bg="info" className="px-2">ICA</Badge>
                                                <Badge bg="warning" text="dark" className="px-2">Gold</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-muted small px-3 d-none d-md-block">
                                        <div className="d-flex justify-content-between mb-1 border-bottom pb-1">
                                            <span>Impact:</span>
                                            <span className="fw-bold">747</span>
                                        </div>
                                    </div>
                                </Col>

                                {/* Post Content */}
                                <Col md={9} xs={12}>
                                    <Card.Body className="p-3 p-md-4 d-flex flex-column h-100">
                                        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small border-bottom pb-2">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span><FaClock className="me-1" />{new Date(thread.createdAt).toLocaleDateString()}</span>
                                                <span className="fw-bold text-primary">{thread.votes || 0} pts</span>
                                            </div>
                                            <span className="fw-bold">#1</span>
                                        </div>

                                        <div className="post-text mb-4" style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
                                            {thread.content}
                                        </div>

                                        <div className="mt-auto">
                                            <div className="text-end mb-3">
                                                <Button variant="link" className="text-decoration-none text-muted p-0 small" onClick={() => scrollToReply(thread.user?.username)}>
                                                    <FaReply className="me-1" /> Reply
                                                </Button>
                                            </div>

                                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center border-top pt-3 gap-3">
                                                <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
                                                    <div className="vote-control d-flex align-items-center border rounded bg-white">
                                                        <Button variant="link" className="px-2 py-1 text-muted" onClick={() => handleVote(thread._id, 'thread', 'up')}><FaChevronUp /></Button>
                                                        <span className="px-2 fw-bold border-start border-end">{thread.votes || 0}</span>
                                                        <Button variant="link" className="px-2 py-1 text-muted" onClick={() => handleVote(thread._id, 'thread', 'down')}><FaChevronDown /></Button>
                                                    </div>
                                                    <Button variant="outline-light" className="text-dark border d-flex align-items-center gap-2 btn-sm px-2" onClick={() => handleLike(thread._id, 'thread')}>
                                                        <FaThumbsUp className="text-primary" /> Like
                                                    </Button>
                                                    <Button variant="outline-light" className="text-dark border d-flex align-items-center gap-2 btn-sm px-2" onClick={() => handleThank(thread._id, 'thread')}>
                                                        <FaHandsHelping className="text-primary" /> Thanks
                                                    </Button>
                                                </div>
                                                <Button variant="outline-primary" size="sm" className="d-flex align-items-center gap-2 px-3 w-30 w-sm-auto justify-content-center" onClick={() => scrollToReply()}>
                                                    <FaCommentDots /> Quick reply
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>

                        {/* Replies Section */}
                        {replies.length > 0 && (
                            <div className="mb-4">
                                <h5 className="fw-bold mb-3 d-flex align-items-center">
                                    <FaReply className="me-2 text-primary" /> 
                                    Replies ({replies.length})
                                </h5>
                                {replies.map((reply, index) => (
                                    <Card key={reply._id || index} className="border-0 shadow-sm mb-3 forum-card-custom">
                                        <Row className="g-0">
                                            <Col md={3} xs={12} className="bg-light border-end text-center py-2 py-md-4">
                                                <div className="d-flex flex-md-column align-items-center justify-content-center px-3">
                                                    <img 
                                                        src={reply.sender?.avatar || 'https://i.pravatar.cc/150?u=user'} 
                                                        alt={reply.sender?.name}
                                                        className="rounded-circle mb-md-2"
                                                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                    />
                                                    <div className="ms-3 ms-md-0">
                                                        <h6 className="fw-bold mb-0 text-dark">{reply.sender?.name}</h6>
                                                        <Badge bg={reply.sender?.role === 'Admin' ? 'danger' : 'secondary'} size="sm">
                                                            {reply.sender?.role}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={9} xs={12}>
                                                <Card.Body className="p-3 p-md-4 d-flex flex-column h-100">
                                                    <div className="d-flex justify-content-between align-items-center mb-3 text-muted small border-bottom pb-2">
                                                        <div className="d-flex flex-wrap gap-2">
                                                            <span><FaClock className="me-1" />{new Date(reply.timestamp).toLocaleDateString()}</span>
                                                            <span className="fw-bold text-primary">{reply.votes || 0} pts</span>
                                                        </div>
                                                        <span className="fw-bold">#{index + 2}</span>
                                                    </div>

                                                    <div className="reply-content text-dark mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                                        {reply.content}
                                                    </div>

                                                    <div className="mt-auto">
                                                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center border-top pt-3 gap-3">
                                                            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
                                                                <div className="vote-control d-flex align-items-center border rounded bg-white">
                                                                    <Button variant="link" className="px-2 py-1 text-muted" onClick={() => handleVote(reply._id, 'reply', 'up')}><FaChevronUp /></Button>
                                                                    <span className="px-2 fw-bold border-start border-end">{reply.votes || 0}</span>
                                                                    <Button variant="link" className="px-2 py-1 text-muted" onClick={() => handleVote(reply._id, 'reply', 'down')}><FaChevronDown /></Button>
                                                                </div>
                                                                <Button variant="outline-light" className="text-dark border d-flex align-items-center gap-2 btn-sm px-2" onClick={() => handleLike(reply._id, 'reply')}>
                                                                    <FaThumbsUp className="text-primary" /> Like
                                                                </Button>
                                                                <Button variant="outline-light" className="text-dark border d-flex align-items-center gap-2 btn-sm px-2" onClick={() => handleThank(reply._id, 'reply')}>
                                                                    <FaHandsHelping className="text-primary" /> Thanks
                                                                </Button>
                                                            </div>
                                                            <Button variant="link" className="text-decoration-none text-muted p-0 small" onClick={() => scrollToReply(reply.sender?.name)}>
                                                                <FaReply className="me-1" /> Reply
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Reply Section */}
                        <Card ref={replyRef} className="border-0 shadow-sm p-3 p-md-4 mb-4">
                            <h5 className="fw-bold mb-3">Join the discussion</h5>
                            <textarea 
                                ref={textareaRef}
                                className="form-control mb-3" 
                                rows="4" 
                                placeholder="Write your reply here..."
                                style={{ borderRadius: '10px' }}
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                disabled={submitting}
                            ></textarea>
                            <div className="text-end">
                                <Button 
                                    className="btn-gold-forum px-4 py-2 w-100 w-sm-auto"
                                    onClick={handlePostReply}
                                    disabled={submitting || !newReply.trim()}
                                >
                                    {submitting ? 'Posting...' : 'Post Reply'}
                                </Button>
                            </div>
                        </Card>

                        {/* Similar Threads Section - Responsive */}
                        {similarThreads.length > 0 && (
                            <div className="similar-threads-container mt-5">
                                <h4 className="fw-bold text-primary mb-4 border-bottom pb-2">Similar threads</h4>
                                {similarThreads.map((st) => (
                                    <Card key={st._id} className="border-0 shadow-sm mb-3 hover-shadow-sm transition-all overflow-hidden">
                                        <Card.Body className="p-2 p-md-3">
                                            <Row className="align-items-center">
                                                <Col xs={2} md={1} className="text-center px-1">
                                                    <div className="avatar-circle-sm bg-secondary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', fontSize: '0.8rem' }}>
                                                        {(st.user?.username || 'A')[0].toUpperCase()}
                                                    </div>
                                                </Col>
                                                <Col xs={10} md={7}>
                                                    <div className="d-flex align-items-center gap-2 mb-1">
                                                        <Badge bg="light" text="primary" className="border border-primary-subtle d-none d-sm-inline-block">discuss</Badge>
                                                        <Link to={`/forum/thread/${st._id}`} className="text-decoration-none fw-bold text-dark small">
                                                            {st.title}
                                                        </Link>
                                                    </div>
                                                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                                                        {st.user?.username} • <span className="text-primary">{st.category}</span>
                                                    </div>
                                                </Col>
                                                <Col md={2} className="text-center d-none d-md-block border-start border-end">
                                                    <div className="fw-bold small">{st.replies || 0} replies</div>
                                                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>{st.views || 0} views</div>
                                                </Col>
                                                <Col md={2} className="text-end d-none d-md-block">
                                                    <div className="text-primary small fw-bold" style={{ fontSize: '0.7rem' }}>Recent activity</div>
                                                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>by {st.user?.username}</div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Col>

                    <Col lg={3} md={12}>
                        {/* Sidebar Widgets */}
                        <div className="sidebar-widget mb-4">
                            <div className="widget-header">Similar Threads</div>
                            <div className="p-3">
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-3 border-bottom pb-2">
                                        <a href="#" className="text-decoration-none fw-bold text-dark small">Tips for buying .com domains</a>
                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>By DomainKing • 12 replies</div>
                                    </li>
                                    <li className="mb-3 border-bottom pb-2">
                                        <a href="#" className="text-decoration-none fw-bold text-dark small">Market trends for 2026</a>
                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>By AIExpert • 45 replies</div>
                                    </li>
                                    <li className="mb-0">
                                        <a href="#" className="text-decoration-none fw-bold text-dark small">How to appraise your portfolio</a>
                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>By Sarah • 8 replies</div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="payment-widget-v2 mb-4 text-center">
                            <h5 className="fw-bold mb-3">Ready to Sell?</h5>
                            <p className="small opacity-75">List your domain in our marketplace today.</p>
                            <Button className="btn-gold w-100">Add Listing</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            
            <style>{`
                .forum-card-custom {
                    border-radius: 8px;
                    overflow: hidden;
                }
                .online {
                    width: 15px;
                    height: 15px;
                    background-color: #2ecc71;
                    border: 2px solid white;
                    border-radius: 50%;
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                }
                .cursor-pointer {
                    cursor: pointer;
                }
                .vote-control button:hover {
                    background-color: #f8f9fa;
                }
                .btn-outline-light:hover {
                    background-color: #f8f9fa;
                    border-color: #dee2e6;
                }
            `}</style>
        </div>
    );
};

export default ForumPost;
