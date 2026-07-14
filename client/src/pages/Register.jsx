import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      toast.success("Registration Successful 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Registration Failed"
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
            <h2 className="fw-bold">
              🤖 AI Email Generator
            </h2>

            <p className="text-muted">
              Create your account
            </p>
          </div>

          <form onSubmit={handleRegister}>

            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2" />
                Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaEnvelope className="me-2" />
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
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
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
            >
              Register
            </button>

          </form>

          <p className="text-center mt-4">
            Already have an account?

            <Link
              to="/"
              className="text-decoration-none ms-2"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Register;