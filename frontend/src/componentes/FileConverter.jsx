import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import axios from 'axios';

function FileConverter() {
  const [fileType, setFileType] = useState(''); // State for the selected file type
  const [convertType, setConvertType] = useState(''); // State for the conversion type
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [error, setError] = useState(''); // State to handle errors
  const [successMessage, setSuccessMessage] = useState(''); // State to show success message
  const [convertedFileUrl, setConvertedFileUrl] = useState(''); // State to store the converted file URL

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccessMessage('');
  };

  // Handle file conversion request
  const handleConvert = async () => {
    if (!fileType || !convertType || !file) {
      setError('Please select the file type, convert type, and upload a file.');
      return;
    }

    // Creating form data to send the file and conversion info
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    formData.append('convertType', convertType);

    try {
      // Send data to the backend API (replace with your actual API endpoint)
      const response = await axios.post('http://localhost:5000/api/seo/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      // Handle successful response
      console.log(response.data.convertedFileUrl);
      
      setConvertedFileUrl(response.data.convertedFileUrl); // Set the URL to the state
      setSuccessMessage('File converted successfully!'); // Success message
      setError(''); // Clear errors
    } catch (err) {
      // Handle error response
      setError(err.response?.data?.message || 'Failed to convert the file.');
    }
  };

  return (
    <Container className="mt-4">
      {/* Title and Description */}
      <h2 className="text-center mb-3">File Converter</h2>
      <p className="text-center mb-4">
        Easily convert your files from one format to another. Select the file type, choose the desired
        conversion, and upload your file to get started.
      </p>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      {/* Dropdowns for File Type and Convert Type */}
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Group controlId="fileTypeSelect" className="w-100">
            <Form.Label className="fw-bold fs-4">Select File Type</Form.Label>
            <Form.Control
              as="select"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="bg-primary text-white p-3"
            >
              <option value="">Choose file type...</option>
              <option value="pdf">PDF</option>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="docx">DOCX</option>
              <option value="pptx">PPTX</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="convertTypeSelect" className="w-100">
            <Form.Label className="fw-bold fs-4">Select Convert To Type</Form.Label>
            <Form.Control
              as="select"
              value={convertType}
              onChange={(e) => setConvertType(e.target.value)}
              className="bg-primary text-white p-3"
            >
              <option value="">Choose convert type...</option>
              <option value="pdf">Convert to PDF</option>
              <option value="csv">Convert to CSV</option>
              <option value="jpg">Convert to JPG</option>
              <option value="png">Convert to PNG</option>
              <option value="pptx">Convert to PPTX</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* File Upload Section */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-center align-items-center">
          <Form.Group controlId="fileUpload" className="w-100">
            <Form.Label className="text-dark fs-4 fw-bold">Upload Your File</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              className="p-4"
              style={{ height: '100px' }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Convert Button */}
      <Row className="text-center mb-4">
        <Col>
          <Button variant="primary" onClick={handleConvert} size="lg">
            Convert File
          </Button>
        </Col>
      </Row>

      {/* Show Converted File and Download Button */}
      {convertedFileUrl && (
        <Row className="mt-4">
          <Col className="text-center">
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="mb-3">Converted File</Card.Title>
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success"
                >
                  Download Converted File
                </a>
                <p>{convertedFileUrl}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default FileConverter;
