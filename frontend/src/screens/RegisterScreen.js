import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';

const RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else {
            console.log('Register logic...');
        }
    };

    return (
        <Container className='py-5'>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    <Card className='p-4 pricing-card'>
                        <h1 className='text-center mb-4'>Create Account</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className='mb-3' controlId='username'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter username'
                                    value={username}
                                    className='bg-dark text-white border-secondary'
                                    onChange={(e) => setUsername(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    className='bg-dark text-white border-secondary'
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    className='bg-dark text-white border-secondary'
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-4' controlId='confirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                    className='bg-dark text-white border-secondary'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary' className='w-100 py-2'>
                                Register
                            </Button>
                        </Form>

                        <Row className='py-3 text-center'>
                            <Col>
                                Already have an account? <Link to='/login' className='text-info'>Login</Link>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterScreen;
