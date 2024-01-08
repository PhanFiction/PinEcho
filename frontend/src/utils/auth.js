import Cookies from 'js-cookie';

export const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const fetchCredentials = () => {
  // Check if the user is already authenticated
  const authToken = Cookies.get('authToken');
  if(!authToken) return false;
  return true;
};

export const fetchUserCredentials = () => {
  const userTokenString = Cookies.get('userToken');
  if(!userTokenString) return null;
  const userToken = JSON.parse(userTokenString);
  return userToken;
}

export const findItem = (arr, target) => {
  if(!arr) return;
  const foundItemArray = arr.find(item => item.includes(target));
  const foundItem = foundItemArray ? true : false;
  return foundItem
}