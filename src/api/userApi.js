import api from "./axiosInstance";

export const getEmployees = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const createEmployee = async (employee) => {
  const { data } = await api.post("/users", employee);
  return data;
};

export const updateEmployee = async (id, employee) => {
  const { data } = await api.put(`/users/${id}`, employee);
  return data;
};

export const deleteEmployeeApi = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
