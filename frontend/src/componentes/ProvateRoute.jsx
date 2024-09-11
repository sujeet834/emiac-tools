import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function PrivateRoute({ children, role }) {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null); // State to hold the user's role

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Fetch user authentication and role information
                const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });

                // Ensure response data is valid before using it
                if (res.data && res.data.data && res.data.data.role) {
                    setUserRole(res.data.data.role);

                    // Correct the logic for setting authentication
                    if (role && res.data.data.role === (role === 'admin' ? 1 : 2)) {
                        console.log("Authorized role, setting auth to true"); 
                        setAuth(true);
                    } else {
                        console.log("Unauthorized role, setting auth to false");
                        setAuth(false);
                    }
                } else {
                    console.error("Invalid response structure");
                    setAuth(false);
                }
            } catch (error) {
                console.error('Error occurred:', error); // Log the error message
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [role]);

    // Show a loading indicator while authentication status is being checked
    if (loading) return <div>Loading...</div>;

    // If not authenticated, redirect to login
    if (!auth) return <Navigate to="/login" />;

    // If authenticated and the role does not match, redirect based on role
    if (auth && role === 'admin' && userRole !== 1) {
        return <Navigate to="/home" />;
    } else if (auth && role === 'user' && userRole === 1) {
        return <Navigate to="/admin" />;
    }

    // If authenticated and authorized, render the children
    return children;
}

export default PrivateRoute;
