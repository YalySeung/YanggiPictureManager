import axiosInstance from '../utils/axiosInstance';

export async function login(username, password) {
  const form = new URLSearchParams();
  form.append('username', username);
  form.append('password', password);

  try {
    await axiosInstance.post('/login', form, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true
    });
    return true;
  } catch (e) {
    console.error('로그인 실패:', e);
    return false;
  }
}