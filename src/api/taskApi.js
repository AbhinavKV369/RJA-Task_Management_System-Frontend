import api from "./axiosInstance";

export const getTasks = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

export const createTask = async (task) => {
  const { data } = await api.post("/tasks", task);
  return data;
};

export const updateTask = async (id, task) => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};
