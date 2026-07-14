import { Link, useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaHistory,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>
          <h2 className="fw-bold text-primary">
            🤖 AI Email Generator
          </h2>

          <h5 className="mt-3">
            👋 Welcome, <span className="text-success">{user?.name}</span>
          </h5>

          <p className="text-muted">
            Generate professional AI-powered emails effortlessly.
          </p>
        </div>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>

      </div>

      <div className="row g-4">

        <div className="col-md-6">

          <div className="card shadow-lg border-0 h-100">

            <div className="card-body text-center">

              <FaRobot
                size={60}
                className="text-primary mb-3"
              />

              <h4>Generate AI Email</h4>

              <p className="text-muted">
                Create professional emails using AI in seconds.
              </p>

              <Link
                to="/generate"
                className="btn btn-primary"
              >
                <FaEnvelope className="me-2" />
                Generate Email
              </Link>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow-lg border-0 h-100">

            <div className="card-body text-center">

              <FaHistory
                size={60}
                className="text-success mb-3"
              />

              <h4>Email History</h4>

              <p className="text-muted">
                View all previously generated emails.
              </p>

              <Link
                to="/history"
                className="btn btn-success"
              >
                <FaHistory className="me-2" />
                View History
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;