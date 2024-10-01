import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Dropdown, Image, Row, Col, Card } from 'react-bootstrap';
import { FaChartLine, FaSearchDollar, FaFont, FaUser, FaSignOutAlt, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Semrush from './Semrush';
import MozData from './MozData';
import WordCount from './WordCount';
import LinkedInScrape from './LinkedInScrape';

function Home() {
    const [activeTab, setActiveTab] = useState('semrush');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'semrush':
                return <Semrush />;
            case 'moz':
                return <MozData />;
            case 'word_count':
                return <WordCount />;
            case 'Linkedin_Scraper':
                return <LinkedInScrape/>
            default:
                return <div>Select an option from the menu</div>;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa, #00bcd4)' }}>
            <Navbar expand="lg" style={{ background: 'linear-gradient(135deg, #00796b, #004d40)' }} variant="dark" className="py-3">
                <Container>
                    <Navbar.Brand href="#" className="d-flex align-items-center">
                        <FaChartLine className="me-2" size={24} />
                        <span style={{ fontSize: '1.6rem', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>SEO Analyzer</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link 
                                onClick={() => setActiveTab('semrush')} 
                                active={activeTab === 'semrush'}
                                className="mx-2 py-2 px-3 rounded"
                                style={{ backgroundColor: activeTab === 'semrush' ? '#0097a7' : 'transparent', color: '#fff', transition: 'background-color 0.3s' }}
                            >
                                <FaSearchDollar className="me-2" />
                                Semrush
                            </Nav.Link>
                            <Nav.Link 
                                onClick={() => setActiveTab('moz')} 
                                active={activeTab === 'moz'}
                                className="mx-2 py-2 px-3 rounded"
                                style={{ backgroundColor: activeTab === 'moz' ? '#0097a7' : 'transparent', color: '#fff', transition: 'background-color 0.3s' }}
                            >
                                <FaChartLine className="me-2" />
                                Moz Data
                            </Nav.Link>
                            <Nav.Link 
                                onClick={() => setActiveTab('word_count')} 
                                active={activeTab === 'word_count'}
                                className="mx-2 py-2 px-3 rounded"
                                style={{ backgroundColor: activeTab === 'word_count' ? '#0097a7' : 'transparent', color: '#fff', transition: 'background-color 0.3s' }}
                            >
                                <FaFont className="me-2" />
                                Word Count
                            </Nav.Link>
                            <Nav.Link 
                                onClick={() => setActiveTab('Linkedin_Scraper')} 
                                active={activeTab === 'Linkedin_Scraper'}
                                className="mx-2 py-2 px-3 rounded"
                                style={{ backgroundColor: activeTab === 'Linkedin_Scraper' ? '#0097a7' : 'transparent', color: '#fff', transition: 'background-color 0.3s' }}
                            >
                                <FaFont className="me-2" />
                                Linkedin Scraper
                            </Nav.Link>
                        </Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-white">
                                <Image src="https://via.placeholder.com/40" roundedCircle width={40} height={40} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ backgroundColor: '#e0f7fa', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                <Dropdown.Item href="#" className="py-2">
                                    <FaUser className="me-2" />
                                    View Profile
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout} className="py-2">
                                    <FaSignOutAlt className="me-2" />
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4 flex-grow-1">
                <Row>
                    <Col>
                        <Card className="shadow-sm" style={{ borderRadius: '10px', backgroundColor: '#fff', padding: '20px' }}>
                            <Card.Body>
                                {renderContent()}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <footer className="mt-5 py-4" style={{ background: 'linear-gradient(135deg, #004d40, #00695c)', color: 'white' }}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
                            <h5 style={{ fontFamily: 'Poppins, sans-serif' }}>SEO Analyzer</h5>
                            <p className="mb-0">Empowering your SEO strategy</p>
                        </Col>
                        <Col md={4} className="text-center mb-3 mb-md-0">
                            <h5>Quick Links</h5>
                            <Nav className="justify-content-center">
                                <Nav.Link href="#" className="text-white">About</Nav.Link>
                                <Nav.Link href="#" className="text-white">Services</Nav.Link>
                                <Nav.Link href="#" className="text-white">Contact</Nav.Link>
                            </Nav>
                        </Col>
                        <Col md={4} className="text-center text-md-end">
                            <h5>Connect With Us</h5>
                            <div>
                                <a href="#" className="text-white me-3"><FaGithub size={24} /></a>
                                <a href="#" className="text-white me-3"><FaTwitter size={24} /></a>
                                <a href="#" className="text-white"><FaLinkedin size={24} /></a>
                            </div>
                        </Col>
                    </Row>
                    <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Row>
                        <Col className="text-center">
                            <p className="mb-0">&copy; 2024 SEO Analyzer. All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default Home;
