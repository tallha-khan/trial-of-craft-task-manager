import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Signup.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      console.log(res.data);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      console.error("Signup error:", err);
    
      const errorMsg = err.response?.data?.msg || err.message || "Server error";
      alert("Error: " + errorMsg);
    }
    
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button className="button1" type="submit">Signup</button>
      
    </form>
    <button type="button" className="button2" onClick={() => navigate('/login')}>
            Already have an account <span style={{ textDecoration: 'underline' }}>Sign In</span>
      </button>
    </div>
  );
}
