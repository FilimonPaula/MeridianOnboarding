import { Link } from "react-router-dom";
import "../styles/HrDashboard.css";
function HrDashboard() {
  const firstName = localStorage.getItem("firstName");

  return (
    <div className="hr-page">
      <aside className="sidebar">
        <h2>MERIDIAN</h2>

        <Link to="/hr">Dashboard</Link>
        <Link to="/users">Employees</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/meetings">Meetings</Link>
        <Link to="/resources">Resources</Link>
      </aside>

      <main className="dashboard">
        <div className="top-bar">
          <h1>HR Dashboard</h1>

          <div className="profile">
            <div className="avatar">👩🏻</div>
            <div>
              <strong>{firstName || "HR"}</strong>
              <p>HR</p>
            </div>
          </div>
        </div>

        <section className="welcome">
          <h2>Welcome, {firstName || "HR"}! 👋</h2>
          <p>Here’s what’s happening in the onboarding process.</p>
        </section>

        <section className="cards">
          <DashboardCard title="Employees" number="8" icon="👥" link="/users" />
          <DashboardCard title="Tasks" number="15" icon="✅" link="/tasks" />
          <DashboardCard
            title="Meetings"
            number="5"
            icon="📅"
            link="/meetings"
          />
          <DashboardCard
            title="Resources"
            number="12"
            icon="📁"
            link="/resources"
          />
        </section>

        <section className="dashboard-lists">
          <div className="list-card">
            <div className="list-header">
              <h3>Recent Employees</h3>
              <Link to="/users">View all</Link>
            </div>

            <Employee
              name="Alex Boboc"
              role="Software Developer"
              date="Today"
            />
            <Employee
              name="Maria Chirila"
              role="QA Engineer"
              date="2 days ago"
            />
            <Employee
              name="Daniel Tudor"
              role="Frontend Developer"
              date="5 days ago"
            />
          </div>

          <div className="list-card">
            <div className="list-header">
              <h3>Upcoming Meetings</h3>
              <Link to="/meetings">View all</Link>
            </div>

            <Meeting
              title="Onboarding - Alex Boboc"
              date="May 15, 2024 · 10:00 AM"
            />
            <Meeting title="Team Introduction" date="May 16, 2024 · 2:00 PM" />
            <Meeting
              title="HR Policies Overview"
              date="May 17, 2024 · 11:00 AM"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function DashboardCard({ title, number, icon, link }) {
  return (
    <Link to={link} className="dashboard-card">
      <div className="card-icon">{icon}</div>
      <h2>{number}</h2>
      <p>{title}</p>
      <span>View all {title.toLowerCase()} →</span>
    </Link>
  );
}

function Employee({ name, role, date }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <div className="list-row">
      <div className="initials">{initials}</div>
      <div>
        <strong>{name}</strong>
        <p>{role}</p>
      </div>
      <span>{date}</span>
    </div>
  );
}

function Meeting({ title, date }) {
  return (
    <div className="meeting-row">
      <div className="meeting-icon">📅</div>
      <div>
        <strong>{title}</strong>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default HrDashboard;
