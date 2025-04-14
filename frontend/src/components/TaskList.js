import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to load tasks:', err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = task => {
    setTasks([...tasks, task]);
  };

  const handleTaskUpdated = updatedTask => {
    setTasks(tasks.map(t => (t._id === updatedTask._id ? updatedTask : t)));
  };

  const handleTaskDeleted = id => {
    setTasks(tasks.filter(t => t._id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    task.priority.toLowerCase().includes(filter.toLowerCase()) ||
    task.category?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Your Tasks</h2>
      <input
        type="text"
        placeholder="Filter by priority or category..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <TaskForm onTaskCreated={handleTaskCreated} />

      <ul>
        {filteredTasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdated={handleTaskUpdated}
            onDeleted={handleTaskDeleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
