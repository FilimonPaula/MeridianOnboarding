import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  updateTaskCompletion,
} from "../services/taskService";
import "../styles/Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const role = localStorage.getItem("role");
  const isHR = role === "HR";
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadTasks();
  }, []);
  async function handleSaveTask(event) {
    event.preventDefault();

    try {
      const taskData = {
        title,
        description,
        dueDate,
        isCompleted: false,
      };

      if (editingTaskId) {
        await updateTask(editingTaskId, taskData);

        const updatedTasks = tasks.map((task) =>
          task.id === editingTaskId ? { ...task, ...taskData } : task,
        );

        setTasks(updatedTasks);
      } else {
        const createdTask = await createTask(taskData);
        setTasks([...tasks, createdTask]);
      }

      setTitle("");
      setDescription("");
      setDueDate("");
      setEditingTaskId(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  }
  function handleEditTask(task) {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate?.slice(0, 10) || "");
    setShowForm(true);
  }
  async function handleDeleteTask(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteTask(id);

      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    } catch (err) {
      setError(err.message);
    }
  }
  async function handleToggleTask(task) {
    try {
      await updateTaskCompletion(task.id, {
        isCompleted: !task.isCompleted,
      });

      setTasks(
        tasks.map((item) =>
          item.id === task.id
            ? { ...item, isCompleted: !item.isCompleted }
            : item,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="employees-page">
      <div className="employees-card">
        <div className="employees-header">
          <div>
            <h1>Tasks</h1>
            <p>Manage onboarding tasks for new employees.</p>
          </div>

          {isHR && (
            <button
              className="add-employee-button"
              type="button"
              onClick={() => {
                setEditingTaskId(null);
                setTitle("");
                setDescription("");
                setDueDate("");
                setShowForm(true);
              }}
            >
              + Add Task
            </button>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="employees-list">
          {tasks.map((task) => (
            <div className="employee-row" key={task.id}>
              <div className="employee-avatar">📋</div>

              <div className="employee-details">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              {isHR ? (
                <span className="employee-status">Task</span>
              ) : (
                <label className="task-check">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggleTask(task)}
                  />
                  Completed
                </label>
              )}

              {isHR && (
                <>
                  <button
                    className="edit-button"
                    type="button"
                    onClick={() => handleEditTask(task)}
                  >
                    ✏️
                  </button>

                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    🗑
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {showForm && isHR && (
          <div className="modal-background">
            <div className="modal">
              <div className="modal-header">
                <h2>{editingTaskId ? "Edit Task" : "Add Task"}</h2>

                <button
                  className="close-button"
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTaskId(null);
                    setTitle("");
                    setDescription("");
                    setDueDate("");
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSaveTask} className="task-form">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <label>Due date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTaskId(null);
                      setTitle("");
                      setDescription("");
                      setDueDate("");
                    }}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-button">
                    {editingTaskId ? "Save Changes" : "Save Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
