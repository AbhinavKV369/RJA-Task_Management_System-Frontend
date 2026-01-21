import { useState, useEffect } from "react";
import { getEmployees } from "../api/userApi";

const EMPTY_TASK = {
  title: "",
  description: "",
  assignedTo: "",
  priority: "Low",
  status: "Pending",
  dueDate: "",
};

const TaskForm = ({ editingTask, onSubmit }) => {
  const [task, setTask] = useState(() => editingTask ?? EMPTY_TASK);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  // Load employees (VALID useEffect – external system)
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to load employees", err);
      }
    };
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title || !task.assignedTo || !task.dueDate) {
      setError("Title, employee and due date are required");
      return;
    }

    onSubmit(task);
    setTask(EMPTY_TASK);
    setError("");
  };

  return (
    <form id="taskform" onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <h3>Add/Edit Task</h3>
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        className="form-control mb-2"
      />

      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="form-control mb-2"
      />

      <select
        name="assignedTo"
        value={task.assignedTo || ""}
        onChange={handleChange}
        className="form-control mb-2">
        <option value="">Assign Employee</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="form-control mb-2">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={task.dueDate?.slice(0, 10) || ""}
        onChange={handleChange}
        className="form-control mb-3"
      />

      <button className="btn btn-primary">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
