import axiosInstance from '../utils/axiosInstance';

export async function login(id, password) {
  const body = new URLSearchParams();
  body.append('username', id);       // 반드시 key는 username
  body.append('password', password); // key는 password

  try {
    const response = await axiosInstance.post('/login', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,  // 세션 쿠키 저장
    });
    return true;
  } catch (error) {
    console.error('로그인 실패', error);
    return false;
  }
}
