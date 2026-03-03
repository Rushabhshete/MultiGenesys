import api from "../../services/api";

export const getAllEmployee = async () => {
  const response = await api.get("/employee");
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(`/employee/${id}`);
  return response.data;
};

export const deleteEmployeeById = async (id) => {
  await api.delete(`/employee/${id}`);
  return id;
};

export const createEmployeeAPI = async (data) => {
  const response = await api.post("/employee", data);
  return response.data;
};

export const updateEmployeeById = async (id, data) => {
  const response = await api.put(`/employee/${id}`, data);
  return response.data;
};
