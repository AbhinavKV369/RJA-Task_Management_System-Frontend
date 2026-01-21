import { useState, useRef, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskStatus from "../components/TaskStatus";
import { useTask } from "../context/task/useTask";
import { createTask, updateTask, deleteTask } from "../api/taskApi";

const AdminDashboard = () => {
  const { tasks, fetchTasks, loading } = useTask();
  const [editingTask, setEditingTask] = useState(null);

  const formRef = useRef(null); // 👈 NEW

  const handleAdd = async (task) => {
    await createTask(task);
    fetchTasks();
  };

  const handleUpdate = async (task) => {
    await updateTask(task._id, task);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(id);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  // ✅ Scroll when editing starts
  useEffect(() => {
    if (editingTask && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [editingTask]);

  return (
    <div className="container py-4">
      <h2>Admin Dashboard</h2>
      <TaskStatus />

      {/* 👇 SCROLL TARGET */}
      <div ref={formRef} className="card p-3 mb-4">
        <TaskForm
          key={editingTask?._id || "new"}
          editingTask={editingTask}
          onSubmit={editingTask ? handleUpdate : handleAdd}
        />
      </div>

      <h3>Tasks</h3>

      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <div className="row g-3">
          {tasks.map((task) => (
            <div key={task._id} className="col-md-4">
              <div className="card p-3 h-100">
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <small>👤 {task.assignedTo?.name || "Unassigned"}</small>
                <br />
                <small>📅 {task.dueDate?.slice(0, 10)}</small>

                <div className="mt-3 d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(task)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(task._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
