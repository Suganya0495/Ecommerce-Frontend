import axios from "axios";

const api = axios.create({
  baseURL: "https://suganyamanikandan1.pythonanywhere.com/api/"
});

export default api;