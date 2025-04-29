// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth.js';
import './LoginPage.css'; // 스타일 분리

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/manager');
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="logo">Yanggi Picture Manager</h1> {/* Yanggi Picture Manager 줄여서 */}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="input-field"
          />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <div className="forgot-password">
          비밀번호를 잊으셨나요?
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
