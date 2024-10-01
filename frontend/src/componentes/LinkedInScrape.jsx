import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table, Pagination, Image } from 'react-bootstrap';

function LinkedInScrape() {
    const [cookie, setCookie] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const employeesPerPage = 10;

    // Dummy data for testing purposes
    const dummyData = [
        {
            image: 'https://via.placeholder.com/50',
            name: 'John Doe',
            designation: 'Software Engineer',
            email: 'johndoe@example.com',
            linkedinUrl: 'https://linkedin.com/in/johndoe',
        },
        {
            image: 'https://via.placeholder.com/50',
            name: 'Jane Smith',
            designation: 'Marketing Manager',
            email: 'janesmith@example.com',
            linkedinUrl: 'https://linkedin.com/in/janesmith',
        },
        // ... more dummy employees
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Make the API call to the backend to get LinkedIn employee data
            const response = await axios.post('/api/linkedin-scrape', {
                cookie,
                companyName,
            });
            
            // Set employee data and pagination
            setEmployeeData(response.data.employees);
            setTotalPages(Math.ceil(response.data.employees.length / employeesPerPage));
        } catch (error) {
            console.error('Error fetching employee data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Paginate the employee data
    const paginatedEmployees = employeeData.slice(
        (currentPage - 1) * employeesPerPage,
        currentPage * employeesPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="mb-4 text-center">Scrape LinkedIn Employee Data</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>LinkedIn Cookie</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter LinkedIn Cookie"
                                value={cookie}
                                onChange={(e) => setCookie(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Fetching Data...' : 'Submit'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            {employeeData.length > 0 && (
                <Row className="mt-5">
                    <Col>
                        <h3 className="mb-4">Employee Data</h3>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Email</th>
                                    <th>LinkedIn URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedEmployees.map((employee, index) => (
                                    <tr key={index}>
                                        <td><Image src={employee.image} roundedCircle width={50} height={50} /></td>
                                        <td>{employee.name}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.email}</td>
                                        <td><a href={employee.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {/* Pagination */}
                        <Pagination className="justify-content-center">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default LinkedInScrape;
