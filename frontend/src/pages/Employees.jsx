import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../services/userService.js";
import "../styles/Employees.css";
import { getTeams } from "../services/teamService";
function Employees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [teamId, setTeamId] = useState("");
  const [teams, setTeams] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  useEffect(() => {
    async function loadData() {
      try {
        const usersData = await getUsers();
        const teamsData = await getTeams();

        setEmployees(usersData);
        setTeams(teamsData);
      } catch (err) {
        setError(err.message);
      }
    }

    loadData();
  }, []);

  async function handleSaveUser(event) {
    event.preventDefault();

    try {
      const userData = {
        firstName,
        lastName,
        email,
        role,
        jobTitle,
        teamId: Number(teamId),
      };

      if (editingUserId) {
        await updateUser(editingUserId, userData);

        setEmployees(
          employees.map((employee) =>
            employee.id === editingUserId
              ? { ...employee, ...userData }
              : employee,
          ),
        );
      } else {
        const newUser = {
          ...userData,
          password,
        };

        const createdUser = await createUser(newUser);
        setEmployees([...employees, createdUser]);
      }

      setShowForm(false);
      setEditingUserId(null);
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setPassword("");
      setJobTitle("");
      setTeamId("");
    } catch (err) {
      setError(err.message);
    }
  }
  function handleEditUser(employee) {
    setEditingUserId(employee.id);
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setEmail(employee.email);
    setRole(employee.role);
    setJobTitle(employee.jobTitle);
    setTeamId("");
    setPassword("");
    setShowForm(true);
  }
  async function handleDeleteUser(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteUser(id);

      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="employees-page">
      <div className="employees-card">
        <div className="employees-header">
          <div>
            <h1>Employees</h1>
            <p>View and manage Meridian employees.</p>
          </div>

          <button
            className="add-employee-button"
            type="button"
            onClick={() => {
              setEditingUserId(null);
              setFirstName("");
              setLastName("");
              setEmail("");
              setRole("");
              setPassword("");
              setJobTitle("");
              setTeamId("");
              setShowForm(true);
            }}
          >
            + Add Employee
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="employees-list">
          {employees.map((employee) => (
            <div className="employee-row" key={employee.id}>
              <div className="employee-avatar">
                {employee.firstName[0]}
                {employee.lastName[0]}
              </div>

              <div className="employee-details">
                <h3>
                  {employee.firstName} {employee.lastName}
                </h3>
                <p>{employee.email}</p>
                <p>{employee.jobTitle}</p>
              </div>

              <span className="employee-status">
                {employee.teamName || "No team"}
              </span>

              <button
                className="edit-button"
                type="button"
                onClick={() => handleEditUser(employee)}
              >
                ✏️
              </button>

              <button
                className="delete-button"
                type="button"
                onClick={() => handleDeleteUser(employee.id)}
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
                <h2>{editingUserId ? "Edit Employee" : "Add Employee"}</h2>

                <button
                  className="close-button"
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUserId(null);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setRole("");
                    setPassword("");
                    setJobTitle("");
                    setTeamId("");
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSaveUser} className="task-form">
                <label>First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <label>Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />

                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {!editingUserId && (
                  <>
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </>
                )}

                <label>Team</label>
                <select
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  required
                >
                  <option value="">Select a team</option>

                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>

                <label>Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />

                <label>Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingUserId(null);
                      setFirstName("");
                      setLastName("");
                      setEmail("");
                      setRole("");
                      setPassword("");
                      setJobTitle("");
                      setTeamId("");
                    }}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-button">
                    {editingUserId ? "Save Changes" : "Save Employee"}
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

export default Employees;
