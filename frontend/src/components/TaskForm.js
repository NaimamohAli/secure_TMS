import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    category: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onTaskCreated(res.data); // Add to list
      setFormData({ title: '', description: '', dueDate: '', priority: 'Low', category: '' });
    } catch (err) {
      console.error('Error creating task:', err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Task</h3>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
