import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../ProjectDetails.css';
import { useNavigate } from 'react-router-dom';


export default function ProjectDetail() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', dueDate: '' });

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // or any auth storage
    navigate('/login');
  };

  const goBack = () => {
    navigate('/projects');
  };

  const fetchTasks = async () => {
    const res = await axios.get(`https://trial-of-craft-task-manager.onrender.com/api/tasks/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    });
    
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://trial-of-craft-task-manager.onrender.com/api/tasks', {
        title: form.title,
        dueDate: form.dueDate,
        project: projectId, // required to associate the task
        status: 'todo' // default status if not chosen in form
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
  
      setForm({ title: '', dueDate: '' });
      fetchTasks();
    } catch (err) {
      alert('Error creating task');
    }
  };
  

  const updateTask = async (task) => {
    try {
      await axios.put(`https://trial-of-craft-task-manager.onrender.com/api/tasks/${task._id}`, {
        title: task.title,
        status: task.status,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      fetchTasks();
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`https://trial-of-craft-task-manager.onrender.com/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      fetchTasks();
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  return (
    <div className="container">
      <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={goBack}>← Back to Projects</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Project Tasks</h2>
      <form onSubmit={createTask}>
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={e => setForm({ ...form, dueDate: e.target.value })}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                setTasks(tasks.map(t => t._id === task._id ? { ...t, title: e.target.value } : t))
              }
            />
            <select
              value={task.status}
              onChange={(e) =>
                setTasks(tasks.map(t => t._id === task._id ? { ...t, status: e.target.value } : t))
              }
            >
              <option value="todo">To-do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <span style={{ marginLeft: '10px' }}>
              📅 {new Date(task.dueDate).toLocaleDateString()}
            </span>
            <button onClick={() => updateTask(task)}>💾</button>
            <button onClick={() => deleteTask(task._id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
