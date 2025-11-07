import { Button, Table, Form, Card, Badge } from "react-bootstrap";
import { clientServer } from "../API";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TaskList({ tasks = [], refreshTasks }) {
  const handleDelete = async (id) => {
    try {
      await clientServer.delete(`/api/tasks/${id}`);
      refreshTasks();
      toast.success("Task deleted !");
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  const handleToggleCompleted = async (id, currentStatus) => {
    try {
      await clientServer.put(`/api/tasks/${id}`, {
        completed: !currentStatus,
      });
      refreshTasks();
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="shadow-sm border-0 mt-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold text-secondary mb-0">Your Tasks</h5>
          <Form.Control
            placeholder="Search tasks..."
            className="w-auto"
            style={{ maxWidth: "220px", fontSize: "0.9rem" }}
            size="sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <Table hover bordered className="align-middle">
            <thead className="table-primary">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Created</th>
                <th>Status</th>
                <th style={{ width: "100px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    No tasks found.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task._id}>
                    <td
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        color: task.completed ? "green" : "black",
                        fontWeight: "500",
                      }}
                    >
                      {task.title}
                    </td>
                    <td>{task.description}</td>
                    <td>{new Date(task.createdAt).toLocaleString()}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Check
                          type="checkbox"
                          checked={task.completed}
                          onChange={() =>
                            handleToggleCompleted(task._id, task.completed)
                          }
                        />
                        <Badge
                          bg={task.completed ? "success" : "warning"}
                          text={task.completed ? "light" : "dark"}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}
