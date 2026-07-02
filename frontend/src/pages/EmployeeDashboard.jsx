import { Link, useNavigate } from "react-router-dom";
import "../styles/EmployeeDashboard.css";
import { getTasks } from "../services/taskService";
import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
function EmployeeDashboard() {
  const firstName = localStorage.getItem("firstName");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(() => {
    async function loadTeamMembers() {
      try {
        const users = await getUsers();
        const currentUser = users.find((user) => user.firstName === firstName);

        if (currentUser) {
          const members = users.filter(
            (user) => user.teamName === currentUser.teamName,
          );

          setTeamMembers(members);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadTeamMembers();
  }, [firstName]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();

        setTasks(data);

        const total = data.length;
        const completed = data.filter((task) => task.isCompleted).length;

        setTotalTasks(total);
        setCompletedTasks(completed);

        const percentage =
          total === 0 ? 0 : Math.round((completed / total) * 100);

        setProgress(percentage);
      } catch (err) {
        setError(err.message);
      }
    }

    loadTasks();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("role");

    navigate("/");
  }
  return (
    <div className="employee-dashboard-page">
      <div className="employee-dashboard-card">
        <div className="employee-dashboard-header">
          <div>
            <h1>Welcome, {firstName || "Employee"} 👋</h1>
            <p>Your first month at Meridian starts here.</p>
          </div>

          <div className="employee-top-right">
            <div className="employee-profile">
              <button className="logout-button" onClick={handleLogout}>
                Log out
              </button>
              <div className="employee-avatar">👤</div>

              <div>
                <h3>{firstName}</h3>
                <p>New employee</p>
              </div>
            </div>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}

        <div className="employee-progress-card">
          <div>
            <h2>Onboarding progress</h2>
            <p>
              {completedTasks} of {totalTasks} tasks completed.
            </p>
          </div>

          <div className="progress-number">{progress}%</div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="employee-dashboard-grid">
          <Link to="/tasks" className="employee-dashboard-box">
            <div className="box-icon">📋</div>
            <h3>My Tasks</h3>
            <p>View your onboarding checklist.</p>
          </Link>

          <Link to="/meetings" className="employee-dashboard-box">
            <div className="box-icon">📅</div>
            <h3>Meetings</h3>
            <p>See your upcoming onboarding meetings.</p>
          </Link>

          <Link to="/resources" className="employee-dashboard-box">
            <div className="box-icon">📁</div>
            <h3>Resources</h3>
            <p>Find useful links and documents.</p>
          </Link>
        </div>

        <div className="employee-bottom-grid">
          <div className="employee-list-card">
            <h3>Today's tasks</h3>

            {tasks.slice(0, 3).map((task) => (
              <div className="employee-list-row" key={task.id}>
                <span>📋</span>
                <p>{task.title}</p>
              </div>
            ))}
          </div>

          <div className="employee-list-card">
            <h3>Your team</h3>

            {teamMembers.map((member) => (
              <div className="buddy-card" key={member.id}>
                <div className="buddy-avatar">
                  {member.firstName[0]}
                  {member.lastName[0]}
                </div>

                <div>
                  <strong>
                    {member.firstName} {member.lastName}
                  </strong>
                  <p>{member.jobTitle}</p>
                  <p>{member.teamName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
