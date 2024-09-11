import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Nav, Navbar, Button, Table, Alert } from 'react-bootstrap';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsers();
        } else if (activeTab === 'tasks') {
            fetchTasks();
        }
    }, [activeTab]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/users', { withCredentials: true });
            setUsers(res.data.data);
        } catch (err) {
            setError('Failed to fetch users');
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tasks', { withCredentials: true });
            setTasks(res.data.data);
        } catch (err) {
            setError('Failed to fetch tasks');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <div>Welcome to the Admin Dashboard</div>;
            case 'users':
                return (
                    <>
                        <h3>Manage Users</h3>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role === 1 ? 'Admin' : 'User'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                );
            case 'tasks':
                return (
                    <>
                        <h3>Manage Tasks</h3>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Task</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <tr key={task._id}>
                                        <td>{task._id}</td>
                                        <td>{task.task}</td>
                                        <td>{task.completed ? 'Completed' : 'Pending'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                );
            default:
                return <div>Select an option from the menu</div>;
        }
    };

    return (
        <Container fluid>
            <Row>
                {/* Sidebar */}
                <Col xs={3} className="bg-dark text-white min-vh-100 p-3">
                    <h4>Admin Dashboard</h4>
                    <Nav className="flex-column">
                        <Nav.Link
                            as={Link}
                            to="#"
                            onClick={() => setActiveTab('dashboard')}
                            className={activeTab === 'dashboard' ? 'active text-white' : 'text-white'}
                        >
                            Dashboard
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="#"
                            onClick={() => setActiveTab('users')}
                            className={activeTab === 'users' ? 'active text-white' : 'text-white'}
                        >
                            Manage Users
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="#"
                            onClick={() => setActiveTab('tasks')}
                            className={activeTab === 'tasks' ? 'active text-white' : 'text-white'}
                        >
                            Manage Tasks
                        </Nav.Link>
                    </Nav>
                </Col>

                {/* Main Content */}
                <Col xs={9} className="p-4">
                    {/* Header */}
                    <Navbar bg="light" className="mb-4">
                        <Container fluid>
                            <Navbar.Brand>Admin Panel</Navbar.Brand>
                            <Button variant="outline-danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Container>
                    </Navbar>

                    {/* Content Area */}
                    {renderContent()}
                </Col>
            </Row>
        </Container>
    );
}

export default AdminDashboard;
