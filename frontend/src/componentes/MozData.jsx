import { useState } from "react";
import axios from 'axios';
import { saveAs } from "file-saver";
import { Container, Row, Col, Button, Form, Table, Alert, Dropdown, DropdownButton } from 'react-bootstrap';


const MozData = ()=>{
    const [urls, setUrls] = useState(''); // State to store URLs
    const [data, setData] = useState([]); // State to store response data
    const [error, setError] = useState(''); // State to store errors
    const [loading, setLoading] = useState(false); // State for loading indicator

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('')
        setLoading(true)

        const urlList = urls.split('\n').map((url)=>url.trim()).filter(Boolean);
        console.log(urlList);
        

        if(urlList.length > 10){
            setError('Please enter 10 or less URLs');
            setLoading(false);
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/seo/mozdata' , {urls:urlList} , {withCredentials:true});            
            setData(res.data.data.data)
        } catch (error) {
            setError("Failed to fetch data")
        } finally{
            setLoading(false)
        }
    }

    // create a csv file
    const handleDownloadCSV = () => {
        if (data.length === 0) {
            setError('No data to download.');
            return;
        }

        // Convert data to CSV format
        const headers = ['website' , 'da' , 'pa' ,'ss'];
        const csvRows = [
            headers.join(','), // Add header row
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
            ].join(',')) // Convert each row to a comma-separated string
        ].join('\n');

        const csvBlob = new Blob([csvRows], { type: 'text/csv' });
        saveAs(csvBlob, 'semrush_data.csv');
    };


    return(
        <Container className="mt-4">
            {/* Heading and Input Area */}
            <Row className="mb-4">
                <Col>
                    <h2>Moz Data Finder</h2>
                    <p>Enter up to 10 URLs/domains, one per line</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="urlInput" className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter URLs, one per line..."
                                value={urls}
                                onChange={(e) => setUrls(e.target.value)}
                                style={{ maxHeight: '150px' }}
                            />
                            <small className="text-muted">1/10 URLs</small>
                        </Form.Group>
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? 'Comparing...' : 'Submit'}
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={() => setUrls('')}>
                                    Clear all
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

            {/* Table Data Display */}
            {data.length > 0 && (
                <>
                    <h3 className="mt-4">Analyzed Targets</h3>
                    <Button variant="success" onClick={handleDownloadCSV} className="mb-3">Download All Data as CSV</Button>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr >
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
                                    <td>{row.da}</td>
                                    <td>{row.pa}</td>
                                    <td>{row.ss}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    )

}




export default MozData;