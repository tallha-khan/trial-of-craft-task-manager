import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../Dashboard.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // or clear your auth storage
    navigate('/login');
  };
  return (
    <div className="dashboard-container" style={{ position: 'relative', minHeight: '100vh' }}>
    
    <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
      <button onClick={handleLogout}>Logout</button>
    </div>
  
    <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>


      <div style={{ marginTop: '20px' }}>
        
        <ul>
          <li>
            Go To : <Link to="/projects">My Projects</Link>
          </li>
          
        </ul>
      </div>
  </div>

  );
}
