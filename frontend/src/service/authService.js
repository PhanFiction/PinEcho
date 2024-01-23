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
  try {
    const res = await axios.get(`${api}/user`, config);
    return res.data;
  }catch(error){
    console.log("error ", error);
  }
}

export const logout = async () => {
  const res = await axios.get(`${api}/logout`, config);
  return res.data;
}

export const updateUser = async  (data) => {
  const res = await axios.put(`${api}/user`, data, config);
  return res.data;
}

export const checkAuthentication = async () => {
  try {
    const res = await axios.get(`${api}/authentication`, config);
    return res;
  } catch(error) {
    return error;
  }
}