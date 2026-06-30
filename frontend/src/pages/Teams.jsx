import { useEffect, useState } from "react";
import { getTeams, createTeam } from "../services/teamService";
import "../styles/Employees.css";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await getTeams();
        console.log(data);
        setTeams(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadTeams();
  }, []);

  async function handleCreateTeam(event) {
    event.preventDefault();
    try {
      const newTeam = {
        name: teamName,
        description: description,
      };

      const createdTeam = await createTeam(newTeam);
      setTeams([...teams, createdTeam]);
      setTeamName("");
      setDescription("");
      setShowForm(false);
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
            onClick={() => setShowForm(true)}
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
                {team.membersCount || 0} members
              </span>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="modal-background">
            <div className="modal">
              <div className="modal-header">
                <h2>Add Team</h2>

                <button
                  className="close-button"
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateTeam} className="task-form">
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
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-button">
                    Save Team
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
