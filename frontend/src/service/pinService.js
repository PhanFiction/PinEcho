import axios from 'axios';
import { config } from '../utils/auth';
const api = process.env.NEXT_PUBLIC_API_URL;

export const getAllPins = async () => {
  try {
    const req = await axios.get(`${api}/pins`);
    return req.data; 
  } catch (error) {
    console.log('failed', error);
  }
}

export const getSinglePin = async (pinId) => {
  const req = await axios.get(`${api}/pins/${pinId}`);
  return req.data;
}

export const getSavedPins = async () => {
  const req = await axios.get(`${api}/pins/saves`, config);
  return req.data;
}

export const savePin = async (pinId) => {
  const req = await axios.put(`${api}/pins/save/${pinId}`, {}, config);
  return req.data;
}

export const getSaves = async () => {
  const req = await axios.get(`${api}/pins/saves`);
  return req.data;
}

export const updatePinLike = async (pinId) => {
  const req = await axios.put(`${api}/pins/likes/${pinId}`, {}, config);
  return req.data;
}

export const updateCommentLike = async (commentId) => {
  const req = await axios.put(`${api}/pins/comment/likes/${commentId}`, {}, config);
  return req.data;
}

export const createComment = async (pinId, data) => {
  const req = await axios.post(`${api}/pins/comment/${pinId}`, data, config);
  return req.data;
}

export const createPin = async (data) => {
  const req = await axios.post(`${api}/pins/create-new-pin`, data, config);
  return req.data;
}

export const deletePin = async (id) => {
  const req = await axios.delete(`${api}/pins/${id}`, config);
  return req.data;
}