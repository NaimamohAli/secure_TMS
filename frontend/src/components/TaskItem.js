import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, onUpdated, onDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...task });

  const token = localStorage.getItem('token');

  const handleEditChange = e => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdated(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeleted(task._id);
    } catch (err) {
      console.error('Delete failed:', err.response?.data?.message || err.message);
    }
  };

  const handleMarkComplete = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, { completed: true }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdated(res.data);
    } catch (err) {
      console.error('Complete failed:', err.response?.data?.message || err.message);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input name="title" value={editData.title} onChange={handleEditChange} />
          <input name="dueDate" type="date" value={editData.dueDate?.slice(0, 10)} onChange={handleEditChange} />
          <select name="priority" value={editData.priority} onChange={handleEditChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input name="category" value={editData.category} onChange={handleEditChange} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <strong>{task.title}</strong> | {task.priority} | {task.category} | Due: {task.dueDate?.slice(0, 10)} | 
          {task.completed ? ' ✅ Completed' : ''}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          {!task.completed && <button onClick={handleMarkComplete}>Mark Completed</button>}
        </>
      )}
    </li>
  );
};

export default TaskItem;
