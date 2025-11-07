import { useState } from "react";
import { Button, Form, Row, Col, Toast } from "react-bootstrap";
import { clientServer } from "../API.jsx";
import { toast } from "react-toastify";

export default function TaskForm({ refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clientServer.post("/api/tasks", { title, description });
      setTitle("");
      setDescription("");
      refreshTasks();
      toast.success("Task added sucessfully !");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 mb-4"
      style={{
        backgroundColor: "#e1c2e8bb",
        borderRadius: "10px",
      }}
    >
      <Row className="g-2 align-items-center">
        <Col md={4}>
          <Form.Control
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            size="sm"
          />
        </Col>
        <Col md={6}>
          <Form.Control
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="sm"
          />
        </Col>
        <Col md={2} className="text-md-end text-center mt-2 mt-md-0">
          <Button type="submit" className="btn-dark" size="sm">
            Add Task
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
