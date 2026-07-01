import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HrDashboard from "./pages/HrDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import "./App.css";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";
import Teams from "./pages/Teams";
import Meetings from "./pages/Meetings";
import Resources from "./pages/Resources";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/hr" element={<HrDashboard />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/users" element={<Employees />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/meetings" element={<Meetings />} />
      <Route path="/resources" element={<Resources />} />
    </Routes>
  );
}

export default App;
