import axiosInstance from '../utils/axiosInstance';

export async function login(email, password) {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
