import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table, Pagination, Image } from 'react-bootstrap';

function LinkedInScrape() {
    const [cookie, setCookie] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    

    const employeesPerPage = 10;

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload

        if (!cookie || !companyName) {
            setError('Please enter both LinkedIn Cookie and Company Name.');
            return;
        }

        setLoading(true);
        setError(''); // Clear previous errors

        try {
            const response = await axios.post(
                'http://localhost:5000/api/seo/linkedin-scrape',
                { cookie, companyName }, { withCredentials: true }, // Send data in POST request
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200 && response.data) {
                const employees = response.data.data[0].data;
                console.log(employees);
                

                // Set employee data and total pages for pagination
                setEmployeeData(employees);
                setTotalPages(Math.ceil(employees.length / employeesPerPage));
            } else {
                setError('No data found or invalid response from the server.');
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
            setError('Error fetching employee data. Please check your inputs and try again.');
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

                    {error && (
                        <div className="mt-3 text-danger">
                            {error}
                        </div>
                    )}
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
                                        <td>
                                            {employee.image ? (
                                                <Image src={employee.image} roundedCircle width={50} height={50} />
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
                                        <td>{employee.name || 'N/A'}</td>
                                        <td>{employee.designation || 'N/A'}</td>
                                        <td>{employee.email || 'N/A'}</td>
                                        <td>
                                            {employee.linkedinUrl ? (
                                                <a
                                                    href={employee.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    LinkedIn Profile
                                                </a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
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
