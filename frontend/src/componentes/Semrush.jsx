import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert, Table, Card, ProgressBar, Badge } from 'react-bootstrap';

const Semrush = () => {
    const [urls, setUrls] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [urlCount, setUrlCount] = useState(0);

    useEffect(() => {
        const count = urls.split('\n').filter(url => url.trim() !== '').length;
        setUrlCount(count);
    }, [urls]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setProgress(0);

        const urlList = urls.split('\n').map((url) => url.trim()).filter(Boolean);

        if (urlList.length > 100) {
            setError('You can only submit up to 100 URLs.');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/seo/semrush', { urls: urlList }, {
                withCredentials: true,
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });
            setData(res.data.data.data);
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCSV = () => {
        if (data.length === 0) {
            setError('No data to download.');
            return;
        }

        const headers = ['Target', 'AS', 'Backlinks', 'Domains', 'Monthly Visits', 'Follow / Nofollow', 'Text', 'Image', 'Form', 'Frame'];
        const csvRows = [
            headers.join(','),
            ...data.map(row => [
                row.website,
                row.ascore,
                row.backlinks,
                row.domains,
                row.visits,
                `${row.follow} / ${row.nofollow}`,
                row.text,
                row.image,
                row.form,
                row.frame
            ].join(','))
        ].join('\n');

        const csvBlob = new Blob([csvRows], { type: 'text/csv' });
        saveAs(csvBlob, 'semrush_data.csv');
    };

    return (
        <Container className="my-5">
            <Card className="shadow-sm">
                <Card.Header as="h2" className="bg-primary text-white">
                    Bulk Backlink Analysis
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter up to 100 URLs/domains, one per line</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={urls}
                                onChange={(e) => setUrls(e.target.value)}
                                placeholder="https://example.com&#10;https://another-example.com"
                                className="mb-2"
                            />
                            <Form.Text className={`${urlCount > 100 ? 'text-danger' : 'text-muted'}`}>
                                {urlCount}/100 URLs
                            </Form.Text>
                        </Form.Group>
                        {urlCount > 100 && (
                            <Alert variant="danger" className="mb-3">
                                You have entered more than 100 URLs. Please reduce the number of URLs to proceed.
                            </Alert>
                        )}
                        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
                        {loading && <ProgressBar animated now={progress} className="mb-3" />}
                        <div className="d-flex justify-content-between">
                            <Button variant="primary" type="submit" disabled={loading || urlCount > 100}>
                                {loading ? 'Analyzing...' : 'Submit'}
                            </Button>
                            <Button variant="outline-secondary" onClick={() => setUrls('')} disabled={loading}>
                                Clear All
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            {data.length > 0 && (
                <Card className="mt-5 shadow-sm">
                    <Card.Header as="h3" className="bg-success text-white d-flex justify-content-between align-items-center">
                        Analyzed Targets
                        <Button variant="light" onClick={handleDownloadCSV}>
                            Download CSV
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive">
                            <Table striped bordered hover className="mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th>Target</th>
                                        <th>AS</th>
                                        <th>Backlinks</th>
                                        <th>Domains</th>
                                        <th>Monthly Visits</th>
                                        <th>Follow / Nofollow</th>
                                        <th>Text</th>
                                        <th>Image</th>
                                        <th>Form</th>
                                        <th>Frame</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.website}</td>
                                            <td>
                                                <Badge bg={row.ascore > 50 ? 'success' : 'warning'}>
                                                    {row.ascore}
                                                </Badge>
                                            </td>
                                            <td>{row.backlinks.toLocaleString()}</td>
                                            <td>{row.domains.toLocaleString()}</td>
                                            <td>{row.visits.toLocaleString()}</td>
                                            <td>{`${row.follow} / ${row.nofollow}`}</td>
                                            <td>{row.text}</td>
                                            <td>{row.image}</td>
                                            <td>{row.form}</td>
                                            <td>{row.frame}</td>
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
}

export default Semrush;