import { useEffect, useState } from "react";
import {
  getResources,
  createResource,
  deleteResource,
  updateResource,
} from "../services/resourceService";
import "../styles/Employees.css";

function Resources() {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingResourceId, setEditingResourceId] = useState(null);
  const role = localStorage.getItem("role");
  const isHR = role === "HR";
  useEffect(() => {
    async function loadResources() {
      try {
        const data = await getResources();
        setResources(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadResources();
  }, []);

  async function handleSaveResource(event) {
    event.preventDefault();

    try {
      const resourceData = {
        title: title,
        description: description,
        url: url,
      };

      if (editingResourceId) {
        await updateResource(editingResourceId, resourceData);

        const updatedResources = resources.map((resource) =>
          resource.id === editingResourceId
            ? { ...resource, ...resourceData }
            : resource,
        );

        setResources(updatedResources);
      } else {
        const createdResource = await createResource(resourceData);
        setResources([...resources, createdResource]);
      }

      setTitle("");
      setDescription("");
      setUrl("");
      setEditingResourceId(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  }
  function handleEditResource(resource) {
    setEditingResourceId(resource.id);
    setTitle(resource.title);
    setDescription(resource.description);
    setUrl(resource.url);
    setShowForm(true);
  }
  async function handleDeleteResource(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resource?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteResource(id);

      const newResources = resources.filter((resource) => resource.id !== id);
      setResources(newResources);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="employees-page">
      <div className="employees-card">
        <div className="employees-header">
          <div>
            <h1>Resources</h1>
            <p>Manage useful links and documents for onboarding.</p>
          </div>

          {isHR && (
            <button
              className="add-employee-button"
              type="button"
              onClick={() => {
                setEditingResourceId(null);
                setTitle("");
                setDescription("");
                setUrl("");
                setShowForm(true);
              }}
            >
              + Add Resource
            </button>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="employees-list">
          {resources.map((resource) => (
            <div className="employee-row" key={resource.id}>
              <div className="employee-avatar">📁</div>

              <div className="employee-details">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>

                <a href={resource.url} target="_blank" rel="noreferrer">
                  Open resource
                </a>
              </div>

              <span className="employee-status">Link</span>

              {isHR && (
                <>
                  <button
                    className="edit-button"
                    type="button"
                    onClick={() => handleEditResource(resource)}
                  >
                    ✏️
                  </button>

                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => handleDeleteResource(resource.id)}
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
                <h2>{editingResourceId ? "Edit Resource" : "Add Resource"}</h2>

                <button
                  className="close-button"
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingResourceId(null);
                    setTitle("");
                    setDescription("");
                    setUrl("");
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSaveResource} className="task-form">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />

                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />

                <label>URL</label>
                <input
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  required
                />

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingResourceId(null);
                      setTitle("");
                      setDescription("");
                      setUrl("");
                    }}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-button">
                    {editingResourceId ? "Save Changes" : "Save Resource"}
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

export default Resources;
