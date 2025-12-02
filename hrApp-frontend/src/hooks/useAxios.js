import axios from "axios";

const API_URL = import.meta.env.PROD ? "https://" : "http://localhost:3001";

const useAxios = () => {
  const get = (path) => axios.get(`${API_URL}${path}`);
  const post = (path, data) => axios.post(`${API_URL}${path}`, data);
  const patch = (path, data) => axios.patch(`${API_URL}${path}`, data);

  return { get, post, patch };
};

export default useAxios;
