import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask, updateTask } from "../actions/TaskActions";
import { logout } from "../actions/AuthActions";
import "./TaskManager.css";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

// Lazy load the AddTask component
const AddTask = lazy(() => import("./AddTask"));

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("title");
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true before fetching data

      try {
        await dispatch(getTasks());
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks. Please try again."); // Set error message
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleComplete = (task) => {
    dispatch(updateTask(task.id, { ...task, completed: !task.completed }));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowAddTaskForm(true);
  };

  const toggleAddTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
    setEditingTask(null);
  };

  const handleFilterChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filterPriority === "all" || task.priority === filterPriority) &&
      (filterStatus === "all" ||
        (filterStatus === "completed" && task.completed) ||
        (filterStatus === "incomplete" && !task.completed))
    );
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "priority") {
      return a.priority.localeCompare(b.priority);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <div className="task-container">
      <div className="task-header">
        <button onClick={toggleAddTaskForm}>
          {showAddTaskForm ? "Close" : "Add Task"}
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {showAddTaskForm && (
        <Suspense
          fallback={
            <div className="loader">
              <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
          }
        >
          <AddTask
            task={editingTask}
            setEditingTask={setEditingTask}
            toggleAddTaskForm={toggleAddTaskForm}
          />
        </Suspense>
      )}
      <div className="filter-sort">
        <div>
          <label>Filter by Priority: </label>
          <select value={filterPriority} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Filter by Status: </label>
          <select value={filterStatus} onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <div>
          <label>Sort by: </label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Creation Date</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="loader">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="task-list">
          <div className="task-item-header">
            <div>Title</div>
            <div>Description</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          {tasks.length === 0 ? (
            <div>No tasks found.</div>
          ) : (
            sortedTasks.map((task) => (
              <div key={task.id} className="task-item">
                <div>{task.title}</div>
                <div>{task.description}</div>
                <div>{task.priority}</div>
                <div>{task.completed ? "Completed" : "Incomplete"}</div>
                <div className="task-actions">
                  <button
                    className="task-button complete"
                    onClick={() => handleComplete(task)}
                  >
                    {task.completed
                      ? "Mark as Incomplete"
                      : "Mark as Completed"}
                  </button>
                  <button
                    className="task-button edit"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="task-button delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
