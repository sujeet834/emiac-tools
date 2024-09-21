import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import Semrush from './Semrush';
import MozData from './MozData';
import WordCount from './WordCount';
import FileConverter from './FileConverter';

function Home() {
    const [activeTab, setActiveTab] = useState('semrush'); // State to track active tab
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    // Function to render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'semrush':
                return <Semrush/>;
            case 'moz':
                return <MozData/>;
            case 'word_count':
                return <WordCount/>;
            case 'fileConverter':
                return <FileConverter/>
            default:
                return <div>Select an option from the menu</div>;
        }
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="justify-content-between">
                <Container>
                    <Navbar.Brand href="#" className="text-white">SEO Analyzer</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setActiveTab('semrush')} href="#" className="text-white">Semrush</Nav.Link>
                        <Nav.Link onClick={() => setActiveTab('moz')} href="#" className="text-white">Moz Data</Nav.Link>
                        <Nav.Link onClick={() => setActiveTab('word_count')} href="#" className="text-white">Word Count</Nav.Link>
                        <Nav.Link onClick={() => setActiveTab('fileConverter')} href="#" className="text-white">File Converter</Nav.Link>
                    </Nav>
                    <DropdownButton
                        align="end"
                        title={<Image src="https://via.placeholder.com/30" roundedCircle />} // Placeholder avatar image
                        id="dropdown-menu-align-end"
                        variant="secondary"
                    >
                        <Dropdown.Item href="#">View Profile</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </DropdownButton>
                </Container>
            </Navbar>

            {/* Render content based on active tab */}
            <Container className="mt-4">
                {renderContent()}
            </Container>
        </>
    );
}

export default Home;
