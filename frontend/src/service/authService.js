import axios from 'axios';
import { config } from '../utils/auth';
const api = process.env.NEXT_PUBLIC_API_URL;

export const signUpService = async (credentials) => {
  try {
    const res = await axios.post(`${api}/auth/signup`, credentials, config);
    return res.data;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error; // Re-throw the error after logging it
  }
}

export const loginService = async (credentials) => {
  try {
    const res = await axios.post(`${api}/auth/login`, credentials, config);
    return res.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Re-throw the error after logging it
  }
}

export const getUser = async () => {
  try {
    const res = await axios.get(`${api}/auth/user`, config);
    return res.data;
  } catch(error) {
    console.log("Failed to get user ", error);
    throw error;
  }
}

export const logout = async () => {
  const res = await axios.get(`${api}/auth/logout`, config);
  return res.data;
}

export const updateUser = async  (data) => {
  try {
    const res = await axios.put(`${api}/auth/user`, data, config);
    return res.data;
  } catch (error) {
    console.error('Failed to update:', error);
    throw error;
  }
}

export const checkAuthentication = async () => {
  try {
    const res = await axios.get(`${api}/auth/authentication`, config);
    return res;
  } catch(error) {
    console.log('failed to check user');
    throw error
  }
}