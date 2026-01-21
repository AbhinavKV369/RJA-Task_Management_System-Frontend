import { useState, useCallback } from "react";
import TaskForm from "../components/TaskForm";
import { useTask } from "../context/task/useTask";
import TaskStatus from "../components/TaskStatus";

const AdminDashboard = () => {
  const { tasks, setTasks } = useTask();
  const [editingTask, setEditingTask] = useState(null);

  const addTask = useCallback(
    (task) => {
      setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    },
    [setTasks],
  );

  const updateTask = useCallback(
    (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
      setEditingTask(null);
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks],
  );

  const handleEdit = useCallback((task) => {
    setEditingTask(task);
  }, []);

  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Admin Dashboard</h2>
        <p className="text-muted mb-0">
          Manage tasks and assignments efficiently
        </p>
      </div>

      <TaskStatus/>

      {/* Task Form Card */}
      <div className="card shadow-sm rounded-4 mb-4 border-0">
        <div
          className="card-header py-3 fw-semibold text-white"
          style={{
            background: "linear-gradient(90deg, #2563eb, #0ea5e9)",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}>
          {editingTask ? "Edit Task" : "Add New Task"}
        </div>
        <div className="card-body">
          <TaskForm
            key={editingTask?.id || "new"}
            addTask={addTask}
            editingTask={editingTask}
            updateTask={updateTask}
          />
        </div>
      </div>

      {/* Task List */}
      <h2 className="py-2 fw-semibold">Tasks</h2>
      <div className="row g-3">
        {tasks.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No tasks created yet.
          </div>
        ) : (
          tasks.map((task) => (
            <div className="col-12 col-md-6 col-lg-4" key={task.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 task-card">
                <div className="card-body d-flex flex-column">
                  {/* Title */}
                  <h5 className="fw-bold mb-1">{task.title}</h5>

                  {/* Description */}
                  <p className="text-muted small mb-3">{task.description}</p>

                  {/* Badges */}
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span
                      className={`badge rounded-pill px-3 py-2 ${
                        task.priority === "High"
                          ? "bg-danger-subtle text-danger"
                          : task.priority === "Medium"
                            ? "bg-warning-subtle text-warning"
                            : "bg-info-subtle text-info"
                      }`}>
                      {task.priority}
                    </span>

                    <span
                      className={`badge rounded-pill px-3 py-2 ${
                        task.status === "Completed"
                          ? "bg-success-subtle text-success"
                          : task.status === "In Progress"
                            ? "bg-warning-subtle text-warning"
                            : "bg-secondary-subtle text-secondary"
                      }`}>
                      {task.status}
                    </span>
                  </div>

                  {/* Due Date */}
                  <small className="text-muted mb-3">
                    📅 Due: {task.dueDate}
                  </small>

                  {/* Actions */}
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm flex-grow-1"
                      onClick={() => handleEdit(task)}>
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm flex-grow-1"
                      onClick={() => deleteTask(task.id)}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
