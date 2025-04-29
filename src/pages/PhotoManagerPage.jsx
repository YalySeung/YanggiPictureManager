// src/pages/PhotoManagerPage.jsx
import React, { useEffect, useState } from 'react';
import { getPhotos, uploadPhoto } from '../api/photo.js';
import PhotoCard from '../components/PhotoCard.jsx';
import TagSelector from '../components/TagSelector.jsx';
import DownloadFavoritesButton from '../components/DownloadFavoritesButton.jsx';
import './PhotoManagerPage.css';

function PhotoManagerPage() {
  const [photos, setPhotos] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    const data = await getPhotos();
    setPhotos(data);
    setLoading(false);
  };

  const toggleFavorite = (photoId) => {
    if (favorites.includes(photoId)) {
      setFavorites(favorites.filter(id => id !== photoId));
    } else {
      setFavorites([...favorites, photoId]);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('jpg, png, pdf 파일만 업로드할 수 있습니다.');
      return;
    }

    const result = await uploadPhoto(file);
    if (result) {
      alert('업로드 성공!');
      fetchPhotos();
    } else {
      alert('업로드 실패');
    }
  };

  const filteredPhotos = selectedTag === 'all'
    ? photos
    : photos.filter(photo => photo.tags.includes(selectedTag));

  return (
    <div className="manager-page">
      <div className="header">
        <h2>사진 관리</h2>
        <div className="header-buttons">
          <label className="upload-button">
            파일 업로드
            <input type="file" hidden onChange={handleFileChange} />
          </label>
          <DownloadFavoritesButton favoriteIds={favorites} />
        </div>
      </div>
      <TagSelector setSelectedTag={setSelectedTag} />
      <div className="photo-grid">
        {loading ? (
          // 로딩 중이면 스켈레톤 표시
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="photo-card skeleton"></div>
          ))
        ) : filteredPhotos.length === 0 ? (
          <div className="empty-message">등록된 사진이 없습니다.</div>
        ) : (
          filteredPhotos.map(photo => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={favorites.includes(photo.id)}
              toggleFavorite={toggleFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PhotoManagerPage;
