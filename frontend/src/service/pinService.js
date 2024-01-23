import axios from 'axios';
import { config } from '../utils/auth';
const api = process.env.NEXT_PUBLIC_API_URL;

export const getAllPins = async () => {
  const req = await axios.get(`${api}/pin/pins`);
  return req.data;
}

export const getSinglePin = async (pinId) => {
  const req = await axios.get(`${api}/pin/${pinId}`);
  return req.data;
}

export const getSavedPins = async () => {
  const req = await axios.get(`${api}/pin/saves`, config);
  return req.data;
}

export const savePin = async (pinId) => {
  const req = await axios.put(`${api}/pin/save/${pinId}`, {}, config);
  return req.data;
}

export const getSaves = async () => {
  const req = await axios.get(`${api}/pin/saves`);
  return req.data;
}

export const updatePinLike = async (pinId) => {
  const req = await axios.put(`${api}/pin/likes/${pinId}`, {}, config);
  return req.data;
}

export const updateCommentLike = async (commentId) => {
  const req = await axios.put(`${api}/pin/comment/likes/${commentId}`, {}, config);
  return req.data;
}

export const createComment = async (pinId, data) => {
  const req = await axios.post(`${api}/pin/comment/${pinId}`, data, config);
  return req.data;
}

export const createPin = async (data) => {
  const req = await axios.post(`${api}/pin/create-new-pin`, data, config);
  return req.data;
}

export const deletePin = async (id) => {
  const req = await axios.delete(`${api}/pin/${id}`, config);
  return req.data;
}