import React from 'react';
import './App.css';
const { useState } = React;

function App()
{
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () =>
  {
    if (editingTask)
    {
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? { ...task, name: taskName, description: taskDescription, date: taskDate } : task
      ));
      setEditingTask(null);
    }
    else
    {
      setTasks([...tasks, { id: Date.now(), name: taskName, description: taskDescription, date: taskDate, completed: false }]);
    }
    setTaskName('');
    setTaskDescription('');
    setTaskDate('');
  };

  const handleEditTask = (task) =>
  {
    setEditingTask(task);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setTaskDate(task.date);
  };

  const handleDeleteTask = (id) =>
  {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) =>
  {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;

  return (
    <div>
      <h1>To Do List</h1>
      
      <div className="form-container">
        <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <input type="text" placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
        <input type="datetime-local" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
        <button onClick={handleAddTask}>{editingTask ? 'Update Task' : 'Add Task'}</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed-task' : 'task'}>
            <h2>{task.name}</h2>
            <p>{task.description}</p>
            <p>{task.date}</p>
            <p>Status: {task.completed ? 'Completed' : 'Scheduled'}</p>
            <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task.id)} /> Mark as Complete
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p className="completed-count">Total Completed Tasks: {completedTasksCount}</p>
    </div>
  );
}

export default App;