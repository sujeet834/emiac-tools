import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaGoogle , FaGithub } from "react-icons/fa";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });
            const role = res.data.data.role;
            if (role === 1) {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (err) {
            console.error(err.response.data.message);
        }
    };

    return (
    //     <div className="login template d-flex justify-content-center align-items-center w-100 vh-100 bg-primary">
    //         <div className='p-5 form-container bg-white'>
    //     <form onSubmit={handleSubmit}>
    //         <h1 className="mb-4 text-center">Sign In</h1>
    //         <div className='mb-2'>
    //             <label className="form-label">Email</label>
    //             <input
    //                 type="email"
    //                 className="form-control"
    //                 placeholder="Enter your email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //             />
    //         </div>
    //         <div className='mb-2'>
    //             <label className="form-label">Password</label>
    //             <input
    //                 type="password"
    //                 className="form-control"
    //                 placeholder="Enter your password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //             />
    //         </div>
    //         <div className='mb-2'>
    //             <input type="checkbox" className='custom-control custom-checkbox' id='check' />
    //             <label className="custom-input-label ms-2" htmlFor="check">Remember me</label>
    //         </div>
    //         <div className="d-grid">
    //         <button className="btn btn-primary" type="submit">Sign in</button>
    //         </div>
    //         <p>
    //             Forgot <a href="">Password ? <a href="/signup">Sign Up</a></a>
    //         </p>
    //     </form> 
    //     </div>
    // </div>
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
    <div className="card p-4 rounded-4" style={{ width: '450px', height:'500px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h4 className="m-3 text-center fs-1 fw-bold">Sign in</h4>
      <form className='mt-5' onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control p-2" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email@email.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control p-2" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
        </div>
        <div className="d-flex justify-content-between mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>
          <a href="#" className="text-decoration-none">Forgot Password?</a>
        </div>
        <button type="submit" className="btn btn-primary w-100 fs-4 p-2">Sign In</button>
      </form>
      <div className="mt-3 text-center">
        <span>Need an account? <a href="/signup" className="text-primary text-decoration-none">Sign up</a></span>
      </div>
    </div>
  </div>
    );
}

export default Login;
