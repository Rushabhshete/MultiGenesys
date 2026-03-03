import api from "../../services/api";

export const getAllCountries = async () => {
  const response = await api.get("/country");
  return response.data;
};