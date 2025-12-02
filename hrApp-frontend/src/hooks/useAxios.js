import axios from "axios";

const API_URL = "https://hrapp-ovc7.onrender.com";

const useAxios = () => {
  const get = (path) => axios.get(`${API_URL}${path}`);
  const post = (path, data) => axios.post(`${API_URL}${path}`, data);
  const patch = (path, data) => axios.patch(`${API_URL}${path}`, data);
  return { get, post, patch };
};

export default useAxios;
