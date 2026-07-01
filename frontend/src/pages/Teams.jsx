import { useEffect, useState } from "react";
import {
  getTeams,
  createTeam,
  deleteTeam,
  updateTeam,
} from "../services/teamService";
import "../styles/Employees.css";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState(null);
  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await getTeams();

        setTeams(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadTeams();
  }, []);

  async function handleSaveTeam(event) {
    event.preventDefault();

    try {
      const teamData = {
        name: teamName,
        description: description,
      };

      if (editingTeamId) {
        await updateTeam(editingTeamId, teamData);

        setTeams(
          teams.map((team) =>
            team.id === editingTeamId ? { ...team, ...teamData } : team,
          ),
        );
      } else {
        const createdTeam = await createTeam(teamData);

        setTeams([...teams, createdTeam]);
      }

      setTeamName("");
      setDescription("");
      setEditingTeamId(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  }
  function handleEditTeam(team) {
    setEditingTeamId(team.id);
    setTeamName(team.name);
    setDescription(team.description);
    setShowForm(true);
  }
  async function handleDeleteTeam(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this team?",
    );
    if (!confirm) {
      return;
    }
    try {
      await deleteTeam(id);
      setTeams(teams.filter((team) => team.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="employees-page">
      <div className="employees-card">
        <div className="employees-header">
          <div>
            <h1>Teams</h1>
            <p>Manage teams and departments at Meridian.</p>
          </div>

          <button
            className="add-employee-button"
            type="button"
            onClick={() => {
              setEditingTeamId(null);
              setTeamName("");
              setDescription("");
              setShowForm(true);
            }}
          >
            + Add Team
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="employees-list">
          {teams.map((team) => (
            <div className="employee-row" key={team.id}>
              <div className="employee-avatar">👥</div>

              <div className="employee-details">
                <h3>{team.name}</h3>
                <p>{team.description}</p>
              </div>

              <span className="employee-status">
                {team.membersCount} members
              </span>

              <button
                className="edit-button"
                type="button"
                onClick={() => handleEditTeam(team)}
              >
                ✏️
              </button>

              <button
                className="delete-button"
                type="button"
                onClick={() => handleDeleteTeam(team.id)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="modal-background">
            <div className="modal">
              <div className="modal-header">
                <h2>{editingTeamId ? "Edit Team" : "Add Team"}</h2>

                <button
                  className="close-button"
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTeamId(null);
                    setTeamName("");
                    setDescription("");
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSaveTeam} className="task-form">
                <label>Team name</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(event) => setTeamName(event.target.value)}
                  required
                />

                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTeamId(null);
                      setTeamName("");
                      setDescription("");
                    }}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-button">
                    {editingTeamId ? "Save Changes" : "Save Team"}
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
export default Teams;
