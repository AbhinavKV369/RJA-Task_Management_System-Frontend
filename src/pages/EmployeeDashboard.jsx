import { useAuth } from "../context/auth/useAuth";
import { useTask } from "../context/task/useTask";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { tasks, setTasks } = useTask();

  const myTasks = tasks.filter((task) => task.assignedTo === user.id);

  const updateStatus = (id, status) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  const statusBadge = (status) =>
    status === "Completed"
      ? "bg-success"
      : status === "In Progress"
        ? "bg-warning text-dark"
        : "bg-secondary";

  const priorityBadge = (priority) =>
    priority === "High"
      ? "bg-danger"
      : priority === "Medium"
        ? "bg-warning text-dark"
        : "bg-info text-dark";

  const statusCount = {
    pending: myTasks.filter((t) => t.status === "Pending").length,
    progress: myTasks.filter((t) => t.status === "In Progress").length,
    completed: myTasks.filter((t) => t.status === "Completed").length,
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Employee Dashboard</h2>
          <p className="text-muted mb-0">
            Welcome back, <strong>{user?.name}</strong>
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-5">
        {[
          { title: "Pending", count: statusCount.pending, color: "secondary" },
          {
            title: "In Progress",
            count: statusCount.progress,
            color: "warning",
          },
          {
            title: "Completed",
            count: statusCount.completed,
            color: "success",
          },
        ].map((card) => (
          <div className="col-12 col-md-4" key={card.title}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body text-center py-4">
                <p className="text-muted small mb-1">{card.title}</p>
                <h1 className={`fw-bold text-${card.color} mb-0`}>
                  {card.count}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks Section */}
      <h5 className="fw-semibold mb-3">My Tasks</h5>

      {myTasks.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body text-center py-5 text-muted">
            No tasks assigned yet
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {myTasks.map((task) => (
            <div className="col-12 col-md-6 col-lg-4" key={task.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body d-flex flex-column">
                  {/* Title */}
                  <h6 className="fw-bold mb-1">{task.title}</h6>

                  {/* Description */}
                  <p className="text-muted small mb-3">{task.description}</p>

                  {/* Badges */}
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span
                      className={`badge rounded-pill px-3 py-2 ${priorityBadge(
                        task.priority,
                      )}`}>
                      {task.priority}
                    </span>

                    <span
                      className={`badge rounded-pill px-3 py-2 ${statusBadge(
                        task.status,
                      )}`}>
                      {task.status}
                    </span>
                  </div>

                  {/* Due Date */}
                  <div className="text-muted small mb-3">
                    <strong>Due:</strong> {task.dueDate}
                  </div>

                  {/* Update Status */}
                  <div className="mt-auto">
                    <label className="form-label small text-muted mb-1">
                      Update Status
                    </label>
                    <select
                      className="form-select form-select-sm"
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
