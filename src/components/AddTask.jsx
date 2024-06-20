import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../actions/TaskActions';
import './TaskManager.css';

const AddTask = ({ task, setEditingTask, toggleAddTaskForm }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [priority, setPriority] = useState(task ? task.priority : 'low');
    const dispatch = useDispatch();

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task) {
            dispatch(updateTask(task.id, { title, description, priority }));
            setEditingTask(null);
        } else {
            dispatch(addTask({ title, description, priority }));
        }
        setTitle('');
        setDescription('');
        setPriority('low');
        toggleAddTaskForm();
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div>
                <label>Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default AddTask;
