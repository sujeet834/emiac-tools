import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Container, Row, Col, Button, Form, Table, Alert, Card, ProgressBar, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaDownload, FaTrash } from 'react-icons/fa';

const MozData = () => {
    const [urls, setUrls] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [urlCount, setUrlCount] = useState(0);

    useEffect(() => {
        const count = urls.split('\n').filter(url => url.trim() !== '').length;
        setUrlCount(count);
    }, [urls]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const urlList = urls.split('\n').map((url) => url.trim()).filter(Boolean);

        if (urlList.length > 10) {
            setError('Please enter 10 or less URLs');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/seo/mozdata', { urls: urlList }, { withCredentials: true });
            setData(res.data.data.data);
        } catch (error) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCSV = () => {
        if (data.length === 0) {
            setError('No data to download.');
            return;
        }

        const headers = ['Website', 'DA', 'PA', 'Spam Score'];
        const csvRows = [
            headers.join(','),
            ...data.map(row => [
                row.website,
                row.da,
                row.pa,
                row.ss
            ].join(','))
        ].join('\n');

        const csvBlob = new Blob([csvRows], { type: 'text/csv' });
        saveAs(csvBlob, 'moz_data.csv');
    };

    return (
        <Container className="my-5">
            <Card className="shadow">
                <Card.Header as="h2" className="bg-primary text-white">
                    <FaSearch className="me-2" /> Moz Data Finder
                </Card.Header>
                <Card.Body>
                    <Card.Text>Enter up to 10 URLs/domains, one per line</Card.Text>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="urlInput" className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="https://example.com&#10;https://another-example.com"
                                value={urls}
                                onChange={(e) => setUrls(e.target.value)}
                                className="mb-2"
                            />
                            <Form.Text className={`${urlCount > 10 ? 'text-danger' : 'text-muted'}`}>
                                {urlCount}/10 URLs
                            </Form.Text>
                        </Form.Group>
                        {loading && <ProgressBar animated now={100} className="mb-3" />}
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <Button variant="primary" type="submit" disabled={loading || urlCount > 10}>
                                    {loading ? 'Analyzing...' : 'Submit'}
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button variant="outline-secondary" onClick={() => setUrls('')} disabled={loading}>
                                    <FaTrash className="me-2" /> Clear all
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            {data.length > 0 && (
                <Card className="mt-4 shadow">
                    <Card.Header as="h3" className="bg-success text-white d-flex justify-content-between align-items-center">
                        Analyzed Targets
                        <Button variant="light" onClick={handleDownloadCSV}>
                            <FaDownload className="me-2" /> Download CSV
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive">
                            <Table striped bordered hover className="mb-0">
                                <thead>
                                    <tr>
                                        <th>Target</th>
                                        <th>DA</th>
                                        <th>PA</th>
                                        <th>Spam Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.website}</td>
                                            <td>
                                                <Badge bg={row.da > 50 ? 'success' : 'warning'} pill>
                                                    {row.da}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Badge bg={row.pa > 50 ? 'success' : 'warning'} pill>
                                                    {row.pa}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Badge bg={row.ss < 5 ? 'success' : row.ss < 10 ? 'warning' : 'danger'} pill>
                                                    {row.ss}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default MozData;