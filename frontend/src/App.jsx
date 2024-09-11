import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './componentes/Login';
import SignupPage from './componentes/Signup';
import HomePage from './componentes/Home';
import AdminDashboard from './componentes/Admin';
import PrivateRoute from './componentes/ProvateRoute';
// import { Navbar, Nav, Container } from 'react-bootstrap';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute role="user">
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute role="admin">
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
