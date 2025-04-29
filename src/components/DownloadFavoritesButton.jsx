// src/components/DownloadFavoritesButton.jsx
import React from 'react';

function DownloadFavoritesButton({ favoriteIds }) {
  const handleDownload = () => {
    if (favoriteIds.length === 0) {
      alert('즐겨찾기한 파일이 없습니다.');
      return;
    }
    const url = `http://localhost:8080/api/photos/download?ids=${favoriteIds.join(',')}`;
    window.open(url);
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      즐겨찾기 다운로드
    </button>
  );
}

export default DownloadFavoritesButton;
