import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Container, Badge } from 'react-bootstrap';

const ProfileScreen = () => {
    const [username, setUsername] = useState('crypto_king');
    const [email, setEmail] = useState('crypto@example.com');
    const [bio, setBio] = useState('Professional domain investor focusing on Web3 and Metaverse names.');
    const [signature, setSignature] = useState('Check out my portfolio at meta-broker.io');
    const [membershipLevel] = useState('Investor');

    const submitHandler = (e) => {
        e.preventDefault();
        alert('Profile Updated Successfully!');
    };

    return (
        <Container className='py-5'>
            <Row>
                <Col md={4}>
                    <Card className='pricing-card mb-4 text-center p-4'>
                        <div className='avatar-placeholder mx-auto mb-3' style={{ width: '120px', height: '120px', backgroundColor: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                            <i className='fas fa-user-circle text-secondary'></i>
                        </div>
                        <h3 className='text-white mb-1'>@{username}</h3>
                        <Badge bg='primary' className='mb-3 px-3 py-2'>{membershipLevel} Account</Badge>
                        <hr className='border-secondary' />
                        <div className='text-start'>
                            <p className='small text-muted mb-1'>Member since: Feb 2026</p>
                            <p className='small text-muted mb-1'>Listings: 12 Active</p>
                            <p className='small text-muted mb-0'>Forum Posts: 45</p>
                        </div>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className='p-4 pricing-card border-0'>
                        <h2 className='mb-4'>Profile Settings</h2>
                        <Form onSubmit={submitHandler}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className='mb-3' controlId='username'>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type='text'
                                            value={username}
                                            className='bg-dark text-white border-secondary'
                                            onChange={(e) => setUsername(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className='mb-3' controlId='email'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type='email'
                                            value={email}
                                            className='bg-dark text-white border-secondary'
                                            onChange={(e) => setEmail(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className='mb-3' controlId='bio'>
                                <Form.Label>Bio (Public)</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={3}
                                    value={bio}
                                    className='bg-dark text-white border-secondary'
                                    onChange={(e) => setBio(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-4' controlId='signature'>
                                <Form.Label>Forum Signature {membershipLevel === 'Free' && <Badge bg='danger' className='ms-2'>Upgrade to Unlock</Badge>}</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={signature}
                                    disabled={membershipLevel === 'Free'}
                                    className='bg-dark text-white border-secondary'
                                    onChange={(e) => setSignature(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <div className='d-flex gap-2 font-weight-bold'>
                                <Button type='submit' variant='primary' className='px-4'>
                                    Save Changes
                                </Button>
                                <Button variant='outline-danger' className='px-4'>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileScreen;
