import { useState } from "react";
import { clientServer } from "../API.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await clientServer.post("/api/user/register", {
        username,
        email,
        password,
      });
      const data = response.data;
      console.log(data);

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (e) {
      console.log("Registration error:", e);
      toast.error(e.response?.data?.message || "Registration failed");
    }
  };

  const goToLogin = () => navigate("/login");

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #a58ea8ff 0%, #75619aff 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "23rem",
          borderRadius: "1.2rem",
          background: "linear-gradient(145deg, #846999ff 0%, #6e498aff 100%)",
          color: "#f8fafc",
        }}
      >
        <h2 className="text-center mb-3 fw-bold">TaskIt</h2>
        <h6 className="text-center text-light mb-4 opacity-75">Register</h6>

        <form onSubmit={handleForm}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg bg-light text-dark border-0"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ borderRadius: "0.6rem" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg bg-light text-dark border-0"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "0.6rem" }}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control form-control-lg bg-light text-dark border-0"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: "0.6rem" }}
            />
          </div>

          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn btn-lg fw-semibold text-white"
              style={{
                background:
                  "linear-gradient(90deg, #6f8bc8ff 0%, #2464cbff 100%)",
                borderRadius: "0.6rem",
              }}
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center mt-2">
          <small className="text-light opacity-75">
            Already have an account?{" "}
            <span
              className="fw-semibold"
              style={{ color: "#93c5fd", cursor: "pointer" }}
              onClick={goToLogin}
            >
              Login
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}
