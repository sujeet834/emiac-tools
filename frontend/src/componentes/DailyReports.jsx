import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function DailyReports() {
  const [currentDate] = useState(new Date()); // Current date state
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [reportData, setReportData] = useState(null); // State for report data

  // Function to get all dates of the current month
  const getDatesOfMonth = () => {
    const dates = [];
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    while (date.getMonth() === currentDate.getMonth()) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  // Sample data - replace with API fetch or dynamic data handling
  const sampleReports = {
    '2024-09-02': {
      name: 'John Doe',
      role: 'Software Developer',
      date: '2024-09-02',
      workingTime: '8 hours',
      reportSummary: 'This morning, after the power came back, I started working on the login page design for a Node.js project. Initially, I used Bootstrap, and then I customized the design using CSS. I worked on this task from 9:30 AM to 10:30 AM.After that, I began working on the EMIAC Super App. My first task was to insert the Time Doctor IDs for all users into the profiles table. Then, I inserted the emp_code and used the user_id to insert Time Doctor data into the hour tracker table. Later, Sujeet Sir shared some punching data with me, which was in PDF format. I uploaded these PDF files to the server with the help of Shubham Sir and then read the data from these files using their URLs. I inserted this data into the punching table based on the user ID. I worked on this task from 10:40 AM until 1:00 PM.After lunch, at 2:00 PM, I also inserted the June and July data from Time Doctor for the users. Sujeet Sir also provided me with the June and July punching data, which I needed to insert into the punching table. However, this task couldn’t be completed because the API for reading the PDFs was unable to read all the data. After 4:00 PM Shubham Sir and I sat together to resolve some issues where user data wasn’t being displayed correctly. I identified and fixed the error. However, there were still some problems with salary calculation, which I also resolved. Finally, I helped Shubham Sir with setting the colors for the cards. We worked on this until 6:20 PM.',
    },
    '2024-09-03': {
      name: 'Jane Smith',
      role: 'Project Manager',
      date: '2024-09-03',
      workingTime: '7 hours',
      reportSummary: 'Managed client meetings and team coordination.',
    },
    // Add more sample reports as needed
  };

  // Handle date selection
  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    setSelectedDate(formattedDate);
    setReportData(sampleReports[formattedDate] || null); 
    // Fetch data dynamically
  };

  return (
    <Container className="mt-4">
      {/* Title */}
      <h2 className="text-center mb-4">Daily Reports</h2>

      {/* Date Row */}
      <Row className="flex-nowrap overflow-auto mb-3">
        {getDatesOfMonth().map((date, index) => (
          <Col key={index} className="p-0">
            <Button
              variant={selectedDate === date.toISOString().split('T')[0] ? 'primary' : 'outline-primary'}
              onClick={() => handleDateClick(date)}
              className="m-1"
            >
              {date.getDate()}
            </Button>
          </Col>
        ))}
      </Row>

      {/* Report Card */}
      {reportData ? (
        <Card className="shadow">
          <Card.Body>
            <Card.Title>Report for {reportData.date}</Card.Title>
            <Card.Text>
              <strong>Name:</strong> {reportData.name}
            </Card.Text>
            <Card.Text>
              <strong>Role:</strong> {reportData.role}
            </Card.Text>
            <Card.Text>
              <strong>Working Time:</strong> {reportData.workingTime}
            </Card.Text>
            <Card.Text>
              <strong>Report Summary:</strong> {reportData.reportSummary}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p className="text-center">Select a date to view the report.</p>
      )}
    </Container>
  );
}

export default DailyReports;
