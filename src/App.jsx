import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axiosInstance from './utils/axiosInstance';

import LoginPage from './pages/LoginPage';
import PhotoUploadPage from './pages/PhotoUploadPage';
import FavoritePage from './pages/FavoritePage';
import PhotoTagPage from './pages/PhotoTagPage';
import PhotoListPage from './pages/PhotoListPage';
import PhotoViewPage from './pages/PhotoViewPage';
import PhotoManagerPage from './pages/PhotoManagerPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false); // 로그인 체크 완료 여부
  const navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    axiosInstance.get('/api/auth/me')
      .then(() => {
        setIsLoggedIn(true);
        setChecked(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setChecked(true);
      });
  }, []);

  if (!checked) {
    return <div className="p-4">⏳ 로그인 상태 확인 중...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? "/manager" : "/login"} replace />} />
      <Route path="/login" element={<LoginPage onLogin={() => {
        setIsLoggedIn(true);
        navigate('/manager');
      }} />} />

      {/* 인증 후 접근 가능한 경로들 */}
      {isLoggedIn && (
        <>
          <Route path="/manager" element={<PhotoManagerPage />} />
          <Route path="/upload" element={<PhotoUploadPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/tags/:photoId" element={<PhotoTagPage />} />
          <Route path="/photos" element={<PhotoListPage />} />
          <Route path="/photos/view/:photoId" element={<PhotoViewPage />} />
        </>
      )}

      {/* 404 fallback */}
      <Route path="*" element={<div className="p-4 text-center text-gray-500">404 페이지를 찾을 수 없습니다</div>} />
    </Routes>
  );
}

export default App;