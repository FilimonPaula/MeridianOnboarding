import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="login-button" type="submit">
            Sign In
          </button>

          <p className="forgot-password">Forgot Password?</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
