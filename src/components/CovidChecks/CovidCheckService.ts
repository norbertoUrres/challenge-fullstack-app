import axios from "axios";
import CovidCheck from "./CovidCheck";

const API = "https://api-covid-checks-e5kl6qshuq-uc.a.run.app";

export const getCovidChecks = async () => {
  return await axios.get<CovidCheck[]>(`${API}/covid/checks`);
};

export const createCovidChecks = async (oCovidCheck: CovidCheck) => {
  return await axios.post(`${API}/covid/checks`, oCovidCheck);
};

export const getCovidCheck = async (id: string) => {
  return await axios.get<CovidCheck>(`${API}/covid/checks/${id}`);
};

export const getStats = async () => {
  return await axios.get(`${API}/covid/stats`);
};

export const searchChecks = async (key: string, value: string) => {
    return await axios.get(`${API}/covid/search?key=${key}&value=${value}`);
};

export const getCountries = async () => {
  return await axios.get(`${API}/covid/countries`);
};
