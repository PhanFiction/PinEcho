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
  try {
    const req = await axios.get(`${api}/pins/${pinId}`);
    return req.data;
  } catch (error) {
    console.log(error);
  }
}

export const getSavedPins = async () => {
  try {
    const req = await axios.get(`${api}/pins/saves`, config);
    return req.data;
  } catch (error) {
    console.error('Error fetching saved pins:', error);
    throw error;
  }
}

export const savePin = async (pinId) => {
  try {
    const req = await axios.put(`${api}/pins/save/${pinId}`, {}, config);
    return req.data;
  } catch (error) {
    console.error(`Error saving pin with ID ${pinId}:`, error);
    throw error;
  }
}

export const getSaves = async () => {
  try {
    const req = await axios.get(`${api}/pins/saves`);
    return req.data;
  } catch (error) {
    console.error('Error fetching saves:', error);
    throw error;
  }
}

export const updatePinLike = async (pinId) => {
  try {
    const req = await axios.put(`${api}/pins/likes/${pinId}`, {}, config);
    return req.data;
  } catch (error) {
    console.error(`Error updating like for pin with ID ${pinId}:`, error);
    throw error;
  }
}

export const updateCommentLike = async (commentId) => {
  try {
    const req = await axios.put(`${api}/pins/comment/likes/${commentId}`, {}, config);
    return req.data;
  } catch (error) {
    console.error(`Error updating like for comment with ID ${commentId}:`, error);
    throw error;
  }
}

export const createComment = async (pinId, data) => {
  try {
    const req = await axios.post(`${api}/pins/comment/${pinId}`, data, config);
    return req.data;
  } catch (error) {
    console.error(`Error creating comment for pin with ID ${pinId}:`, error);
    throw error;
  }
}

export const createPin = async (data) => {
  try {
    const req = await axios.post(`${api}/pins/create-new-pin`, data, config);
    return req.data;
  } catch (error) {
    console.error('Error creating new pin:', error);
    throw error;
  }
}

export const deletePin = async (id) => {
  try {
    const req = await axios.delete(`${api}/pins/${id}`, config);
    return req.data;
  } catch (error) {
    console.error(`Error deleting pin with ID ${id}:`, error);
    throw error;
  }
}