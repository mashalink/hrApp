import axios from "axios";

const API_URL = "https://hrapp-ovc7.onrender.com";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const useAxios = () => {
  console.log("API_URL:", API_URL);

  const get = (path) => axiosInstance.get(path);
  const post = (path, data) => axiosInstance.post(path, data);
  const patch = (path, data) => axiosInstance.patch(path, data);

  return { get, post, patch };
};

export default useAxios;
