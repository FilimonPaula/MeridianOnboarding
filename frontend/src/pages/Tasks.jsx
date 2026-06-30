import { useEffect, useState } from "react";
import { getTasks, createTask } from "../services/taskService";
import "../styles/Tasks.css";
function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false);

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

  async function handleCreateTask(event) {
    event.preventDefault();
    try {
      const newTask = {
        title: title,
        description: description,
        dueDate: dueDate,
      };
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      setTitle("");
      setDescription("");
      setDueDate("");
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

          <button
            className="add-employee-button"
            onClick={() => setShowForm(true)}
          >
            + Add Task
          </button>
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

              <span
                className={
                  task.isCompleted
                    ? "employee-status completed"
                    : "employee-status pending"
                }
              >
                {task.isCompleted ? "Completed" : "Pending"}
              </span>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="modal-background">
            <div className="modal">
              <div className="modal-header">
                <h2>Add Task</h2>

                <button
                  className="close-button"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="task-form">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <label>Due date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-button">
                    Save Task
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
