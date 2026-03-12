import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Container, Badge } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MarketplaceScreen = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mock data for initial render
    useEffect(() => {
        const fetchListings = async () => {
            try {
                // In a real app, this would be: const { data } = await axios.get('/api/marketplace');
                const mockData = [
                    { _id: '1', domainName: 'metaverse.io', price: 50000, description: 'Premium metaverse domain', listingType: 'FixedPrice', seller: { username: 'crypto_king' } },
                    { _id: '2', domainName: 'ecofriendly.com', price: 12000, description: 'Perfect for green startups', listingType: 'MakeOffer', seller: { username: 'nature_lady' } },
                    { _id: '3', domainName: 'web3app.net', price: 8500, description: 'Web3 development hub', listingType: 'Auction', seller: { username: 'dev_guy' } },
                    { _id: '4', domainName: 'luxurytravel.vc', price: 25000, description: 'Venture capital for luxury travel', listingType: 'FixedPrice', seller: { username: 'traveler' } },
                ];
                setListings(mockData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch listings');
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    return (
        <Container className='py-5'>
            <div className='d-flex justify-content-between align-items-center mb-5'>
                <h1 className='fw-bold'>Domain <span style={{ color: '#00d4ff' }}>Marketplace</span></h1>
                <Button variant='primary' size='lg'>+ Post Listing</Button>
            </div>

            <Card className='p-3 mb-5 glass-card border-0'>
                <Row className='g-3'>
                    <Col md={6}>
                        <Form.Control type='text' placeholder='Search domains...' className='bg-dark text-white border-secondary' />
                    </Col>
                    <Col md={3}>
                        <Form.Select className='bg-dark text-white border-secondary'>
                            <option>All Types</option>
                            <option>Fixed Price</option>
                            <option>Auction</option>
                            <option>Make Offer</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Button variant='outline-info' className='w-100'>Apply Filters</Button>
                    </Col>
                </Row>
            </Card>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row className='g-4'>
                    {listings.map((listing) => (
                        <Col key={listing._id} lg={4} md={6}>
                            <Card className='pricing-card h-100'>
                                <Card.Header className='bg-transparent border-0 pt-4 px-4'>
                                    <div className='d-flex justify-content-between align-items-start'>
                                        <h4 className='fw-bold mb-0'>{listing.domainName}</h4>
                                        <Badge bg='info'>{listing.listingType}</Badge>
                                    </div>
                                </Card.Header>
                                <Card.Body className='px-4'>
                                    <h3 className='text-white mt-2 mb-3'>${listing.price.toLocaleString()}</h3>
                                    <p className='text-muted'>{listing.description}</p>
                                    <hr className='border-secondary' />
                                    <div className='d-flex justify-content-between small text-muted'>
                                        <span>Seller: @{listing.seller.username}</span>
                                        <span>Listed: Today</span>
                                    </div>
                                </Card.Body>
                                <Card.Footer className='bg-transparent border-0 pb-4 px-4'>
                                    <Button variant='outline-primary' className='w-100'>View Details</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default MarketplaceScreen;
