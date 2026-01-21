import { useCallback, useEffect, useState } from "react";
import { createEmployee, deleteEmployeeApi, getEmployees, updateEmployee } from "../api/userApi";

const AdminUsers = () => {
  const [employees, setEmployees] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ useCallback prevents re-creation
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || (!editingUser && !form.password)) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (editingUser) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;

        await updateEmployee(editingUser._id, payload);
        setEditingUser(null);
      } else {
        await createEmployee(form);
      }

      setForm({ name: "", email: "", password: "" });
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, password: "" });
   document.getElementById("taskform").scrollIntoView({
     behavior: "smooth",
   });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      setLoading(true);
      await deleteEmployeeApi(id);
      fetchEmployees();
    } catch {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Admin – Manage Employees</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-3 mb-3">
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-primary" disabled={loading}>
          {editingUser ? "Update" : "Create"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th width="180">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(u)}>
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
