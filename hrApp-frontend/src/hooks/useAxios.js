import axios from "axios";

const API_URL = import.meta.env.PROD
  ? "https://hrapp-ovc7.onrender.com"
  : "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const useAxios = () => {
  const get = (path) => axiosInstance.get(path);
  const post = (path, data) => axiosInstance.post(path, data);
  const patch = (path, data) => axiosInstance.patch(path, data);

  return { get, post, patch };
};

export default useAxios;
