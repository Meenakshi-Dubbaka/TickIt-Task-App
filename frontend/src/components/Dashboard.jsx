import { useEffect, useState } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { clientServer } from "../API.jsx";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await clientServer.get("/api/profile");
      setUser(res.data);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await clientServer.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Failed to load tasks:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await clientServer.post("/api/user/logout");
      toast.success("Logged out successfully!");
      setUser(null);
      navigate("/login");
    } catch (e) {
      console.log("Logout failed", e);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #a58ea8ff 0%, #75619aff 100%)",
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <Container>
        <Card
          className="shadow p-4"
          style={{
            borderRadius: "12px",
            background: "linear-gradient(145deg, #846999ff 0%, #9976b4ff 100%)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-dark mb-0">
              Welcome, {user?.username}
            </h3>
            <Button className="btn-dark" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <TaskForm refreshTasks={fetchTasks} />
          <TaskList tasks={tasks} refreshTasks={fetchTasks} />
        </Card>
      </Container>
    </div>
  );
}
