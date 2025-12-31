import axios from "axios"
import { auth } from "../services/firebaseConnection";

const baseUrl = import.meta.env.VITE_BACKEND_URL

const api = axios.create({
  baseURL: `${baseUrl}/api/v1`
})

api.interceptors.request.use(async (config) => {
  let token
  const user = auth.currentUser

  if (user) {
    token = await user.getIdToken()
  }

  try {

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Falha ao obter o token', error);
  }

  return config
})


export default api