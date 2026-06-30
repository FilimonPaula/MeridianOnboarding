import { useEffect, useState } from "react";
import { getUsers, createUser } from "../services/userService";
import "../styles/Employees.css";
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
  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await getUsers();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadEmployees();
  }, []);

  async function handleCreateUser(event) {
    event.preventDefault();
    try {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        password: password,
        jobTitle: jobTitle,
        teamId: Number(teamId),
      };

      const createdUser = await createUser(newUser);
      setEmployees([...employees, createdUser]);
      setShowForm(false);
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
            onClick={() => setShowForm(true)}
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
              </div>

              <span className="employee-status">Active</span>
            </div>
          ))}
        </div>
        {showForm && (
          <div className="modal-background">
            <div className="modal">
              <div className="modal-header">
                <h2>Add Employee</h2>

                <button
                  className="close-button"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="task-form">
                <label>First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label>Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label>Team</label>
                <input
                  type="text"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                />

                <label>Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label>Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
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
                    Save Employee
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
