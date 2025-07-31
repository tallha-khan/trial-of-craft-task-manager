import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import { Link } from 'react-router-dom';
import '../Projects.css';


export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // or clear your auth storage
    navigate('/login');
  };

  const goToDashboard = () => {
    navigate('/dashboard'); // make sure this route exists
  };
  const fetchProjects = async () => {
    const res = await axios.get('https://trial-of-craft-task-manager.onrender.com
/api/projects', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    await axios.post('https://trial-of-craft-task-manager.onrender.com
/api/projects', form, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setForm({ title: '', description: '' });
    fetchProjects();
  };

  return (
    <div className="projects-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={goToDashboard}>← Back to Dashboard</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Create a new Projects</h2>
      <form onSubmit={createProject}>
        <input name="title" placeholder="Project title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input name="description" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Create</button>
      </form>
      <h2>My Projects</h2>
      <ul>
        {projects.map(proj => (
          <li key={proj._id}>
          <Link to={`/projects/${proj._id}`}>
            {proj.title} - {proj.description}
          </Link>
        </li>
          
        ))}
      </ul>
    </div>
  );
}
