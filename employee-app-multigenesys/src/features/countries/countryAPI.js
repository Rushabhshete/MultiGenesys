import api from "../../services/api";

export const fetchCountriesAPI = async () => {
  const response = await api.get("/country");
  return response.data;
};