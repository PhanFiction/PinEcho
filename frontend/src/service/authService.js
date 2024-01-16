import axios from 'axios';
import { config } from '../utils/auth';
const api = process.env.NEXT_PUBLIC_API_URL;

export const signUpService = async (credentials) => {
  const res = await axios.post(`${api}/signup`, credentials, config);
  return res.data;
}

export const loginService = async (credentials) => {
  const res = await axios.post(`${api}/login`, credentials, config);
  return res.data;
}

export const getUser = async () => {
  const res = await axios.get(`${api}/user`, config);
  return res.data;
}

export const logout = async () => {
  const res = await axios.get(`${api}/logout`, config);
  return res.data;
}