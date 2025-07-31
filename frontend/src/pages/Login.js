import React, { useState , useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import '../Login.css'; 

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://trial-of-craft-task-manager.onrender.com
/api/auth/login', form);
      setUser(res.data.user);

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');

    } catch (err) {
      console.log("Login Error:", err.response?.data?.message || err.message);

      alert('Login failed: ' + err.response?.data?.msg);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button className="button1" type="submit">Login</button>
    </form>
    <button type="button" className="button2" onClick={() => navigate('/signup')}>
            Don't have an account <span style={{ textDecoration: 'underline' }}>Sign Up</span>
      </button>
    </div>
  );
}
