import { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

function WordCount() {
    const [text, setText] = useState(''); // State to store input text
    const [wordCount, setWordCount] = useState(null); // State to store word count
    const [error, setError] = useState(''); // State to store errors

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Trim the text and split by spaces to calculate word count
        const wordsArray = text.trim().split(/\s+/);
        const count = wordsArray.filter(word => word).length; // Filter out empty strings

        setWordCount(count);
    };

    return (
        <Container className="mt-4">
            {/* Title and Description */}
            <Row className="mb-4">
                <Col>
                    <h2>Word Count Tool</h2>
                    <p>Use this tool to count the total number of words in your text. Simply enter or paste your content below and click "Count Words" to get the result.</p>
                </Col>
            </Row>

            {/* Input Area */}
            <Row className="mb-4">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="textInput" className="mb-3">
                            <Form.Label>Enter your text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter or paste your text here..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                style={{ maxHeight: '150px' }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Count Words
                        </Button>
                    </Form>
                </Col>
            </Row>

            {/* Display Word Count */}
            {wordCount !== null && (
                <Row>
                    <Col>
                        <Alert variant="info">
                            <h4>Total Word Count: {wordCount}</h4>
                        </Alert>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default WordCount;
