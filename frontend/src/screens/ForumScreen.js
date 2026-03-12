import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, ListGroup, Container, Badge } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ForumScreen = () => {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const mockThreads = [
                    { _id: '1', title: 'How to value .IO domains in 2026?', category: 'Appraisal', user: { username: 'expert_domainer' }, replies: 24, lastPost: '2 mins ago' },
                    { _id: '2', title: 'Share your first domain sale story!', category: 'General', user: { username: 'newbie_investor' }, replies: 56, lastPost: '15 mins ago' },
                    { _id: '3', title: 'Outbound strategy for medical domains', category: 'Strategies', user: { username: 'sales_pro' }, replies: 12, lastPost: '1 hour ago' },
                    { _id: '4', title: 'The impact of AI on domain names', category: 'Trends', user: { username: 'tech_vision' }, replies: 89, lastPost: '3 hours ago' },
                ];
                setThreads(mockThreads);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch forum threads');
                setLoading(false);
            }
        };

        fetchThreads();
    }, []);

    return (
        <Container className='py-5'>
            <div className='d-flex justify-content-between align-items-center mb-5'>
                <h1 className='fw-bold'>Community <span style={{ color: '#00d4ff' }}>Hub</span></h1>
                <Button variant='primary' size='lg'>Start New Thread</Button>
            </div>

            <Row>
                <Col lg={8}>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Card className='glass-card border-0 overflow-hidden'>
                            <ListGroup variant='flush'>
                                {threads.map((thread) => (
                                    <ListGroup.Item key={thread._id} className='bg-transparent border-secondary py-4 px-4 hover-highlight'>
                                        <Row className='align-items-center'>
                                            <Col md={8}>
                                                <Badge bg='secondary' className='mb-2'>{thread.category}</Badge>
                                                <h4 className='text-white mb-1'>{thread.title}</h4>
                                                <div className='small text-muted'>
                                                    Started by @{thread.user.username} &bull; {thread.lastPost}
                                                </div>
                                            </Col>
                                            <Col md={2} className='text-center'>
                                                <div className='fw-bold text-white'>{thread.replies}</div>
                                                <div className='small text-muted'>Replies</div>
                                            </Col>
                                            <Col md={2} className='text-end'>
                                                <Button variant='link' className='text-info p-0 text-decoration-none'>Read More</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                    )}
                </Col>

                <Col lg={4}>
                    <Card className='pricing-card mb-4'>
                        <Card.Body>
                            <h5 className='text-white mb-3'>Popular Categories</h5>
                            <ListGroup variant='flush'>
                                <ListGroup.Item className='bg-transparent border-secondary text-muted px-0 d-flex justify-content-between align-items-center'>
                                    Domain Appraisal <Badge bg='primary' pill>1.2k</Badge>
                                </ListGroup.Item>
                                <ListGroup.Item className='bg-transparent border-secondary text-muted px-0 d-flex justify-content-between align-items-center'>
                                    Selling Strategies <Badge bg='primary' pill>850</Badge>
                                </ListGroup.Item>
                                <ListGroup.Item className='bg-transparent border-secondary text-muted px-0 d-flex justify-content-between align-items-center'>
                                    Success Stories <Badge bg='primary' pill>420</Badge>
                                </ListGroup.Item>
                                <ListGroup.Item className='bg-transparent border-secondary text-muted px-0 d-flex justify-content-between align-items-center'>
                                    Technical Support <Badge bg='primary' pill>210</Badge>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card className='pricing-card popular'>
                        <Card.Body>
                            <h5 className='text-white mb-3'>Membership Perks</h5>
                            <p className='small text-muted'>Premium members get verified badges and specialized forum icons.</p>
                            <Button variant='outline-info' size='sm' className='w-100'>Upgrade Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ForumScreen;
