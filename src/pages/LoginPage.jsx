import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const success = await login(email, password);
    if (success) {
      navigate('/manager');
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;
