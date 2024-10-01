import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert, Card } from 'react-bootstrap';
import { FaCalculator, FaEraser, FaCopy, FaFont, FaAlignLeft } from 'react-icons/fa';

function WordCount() {
    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
        setCharCount(text.length);
    }, [text]);

    const handleClear = () => {
        setText('');
        setError('');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setError('Text copied to clipboard!');
            setTimeout(() => setError(''), 3000);
        }, () => {
            setError('Failed to copy text. Please try again.');
        });
    };

    return (
        <Container fluid className="p-4" style={{ backgroundColor: '#f0f0f0' }}>
            <Row className="justify-content-center">
                <Col xs={12} lg={10} xl={8}>
                    <Card className="shadow-lg" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                        <Card.Header className="text-white py-3" style={{ backgroundColor: '#4a4e69' }}>
                            <h2 className="mb-0"><FaCalculator className="me-2" /> Word Count Tool</h2>
                        </Card.Header>
                        <Card.Body className="px-4 py-5" style={{ backgroundColor: '#ffffff' }}>
                            <Form>
                                <Form.Group controlId="textInput" className="mb-4">
                                    <Form.Label className="h5 mb-3">Enter your text</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={10}
                                        placeholder="Start typing or paste your text here..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="mb-3"
                                        style={{ borderColor: '#9a8c98', fontSize: '16px' }}
                                    />
                                </Form.Group>
                                <Row className="align-items-center mb-4">
                                    <Col xs={12} md={6} className="mb-3 mb-md-0">
                                        <div className="d-flex justify-content-between">
                                            <Button 
                                                variant="outline-secondary" 
                                                onClick={handleClear}
                                                className="w-100 me-2"
                                                style={{ borderColor: '#9a8c98', color: '#4a4e69' }}
                                            >
                                                <FaEraser className="me-2" /> Clear
                                            </Button>
                                            <Button 
                                                variant="outline-primary" 
                                                onClick={handleCopy}
                                                className="w-100 ms-2"
                                                style={{ borderColor: '#22223b', color: '#22223b' }}
                                            >
                                                <FaCopy className="me-2" /> Copy
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Row className="g-2">
                                            <Col xs={6}>
                                                <div className="p-3 rounded text-center" style={{ backgroundColor: '#c9ada7' }}>
                                                    <FaFont className="me-2" style={{ color: '#22223b' }} />
                                                    <span className="fw-bold">{charCount}</span> Characters
                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="p-3 rounded text-center" style={{ backgroundColor: '#c9ada7' }}>
                                                    <FaAlignLeft className="me-2" style={{ color: '#22223b' }} />
                                                    <span className="fw-bold">{wordCount}</span> Words
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                            {error && (
                                <Alert variant="info" className="mt-3" style={{ backgroundColor: '#f2e9e4', borderColor: '#9a8c98', color: '#22223b' }}>
                                    {error}
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default WordCount;