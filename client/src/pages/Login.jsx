import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      alert("1️⃣ Login button clicked");

      const response = await API.post("/auth/login", formData);

      alert("2️⃣ API Success");

      console.log("LOGIN RESPONSE:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("3️⃣ User Saved: " + localStorage.getItem("user"));
      alert("4️⃣ Token Saved: " + localStorage.getItem("token"));

      toast.success("Login Successful 🎉");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        "❌ API Failed: " +
          (error.response?.data?.message || error.message)
      );

      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
        }}
      >
        <div
          className="card shadow-lg p-4"
          style={{
            width: "420px",
            borderRadius: "15px",
          }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold">🤖 AI Email Generator</h2>

            <p className="text-muted">
              Login to continue
            </p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="mb-3">
              <label className="form-label">
                <FaEnvelope className="me-2" />
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaLock className="me-2" />
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-4">
            Don't have an account?

            <Link
              to="/register"
              className="text-decoration-none ms-2"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;