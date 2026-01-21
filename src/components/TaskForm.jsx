import { useState } from "react";
import { users } from "../data/users";

const EMPTY_TASK = {
  title: "",
  description: "",
  assignedTo: "",
  priority: "Low",
  status: "Pending",
  dueDate: "",
};

const TaskForm = ({ addTask, editingTask, updateTask }) => {
  const [task, setTask] = useState(editingTask ?? EMPTY_TASK);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: name === "assignedTo" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title || !task.assignedTo || !task.dueDate) {
      setError("Title, employee and due date are required");
      return;
    }

    editingTask ? updateTask(task) : addTask(task);

    setTask(EMPTY_TASK);
    setError("");
  };

  const employees = users.filter((u) => u.role === "employee");

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h5>{editingTask ? "Edit Task" : "Add Task"}</h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        name="title"
        className="form-control mb-2"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        className="form-control mb-2"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />

      <select
        name="assignedTo"
        className="form-control mb-2"
        value={task.assignedTo}
        onChange={handleChange}>
        <option value="">Assign Employee</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
          </option>
        ))}
      </select>

      <select
        name="priority"
        className="form-control mb-2"
        value={task.priority}
        onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        name="dueDate"
        className="form-control mb-3"
        value={task.dueDate}
        onChange={handleChange}
      />

      <button className="btn btn-primary">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
