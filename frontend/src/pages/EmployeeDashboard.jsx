import { Link } from "react-router-dom";
import "../styles/EmployeeDashboard.css";
import "../pages/Meetings.jsx";
import "../pages/Resources.jsx";
import "../pages/Tasks.jsx";
import { getTasks } from "../services/taskService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function EmployeeDashboard() {
  const firstName = localStorage.getItem("firstName");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    async function loadTasks() {
      try {
        const tasks = await getTasks();

        const totalTasks = tasks.length;

        const completedTasks = tasks.filter((task) => task.isCompleted).length;

        const percentage =
          totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

        setProgress(percentage);
      } catch (err) {
        console.error(err);
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

        <div className="employee-progress-card">
          <div>
            <h2>Onboarding progress</h2>
            <p>Keep completing your tasks step by step.</p>
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
            <h3>Today’s plan</h3>

            <div className="employee-list-row">
              <span>09:00</span>
              <p>Set up your workstation</p>
            </div>

            <div className="employee-list-row">
              <span>11:00</span>
              <p>Meet your onboarding buddy</p>
            </div>

            <div className="employee-list-row">
              <span>14:00</span>
              <p>Read company resources</p>
            </div>
          </div>

          <div className="employee-list-card">
            <h3>Your buddy</h3>

            <div className="buddy-card">
              <div className="buddy-avatar">AB</div>
              <div>
                <strong>Alex Boboc</strong>
                <p>Software Developer</p>
                <p>Available today in office</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
