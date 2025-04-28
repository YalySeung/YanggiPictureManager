import { useEffect, useState } from 'react';
import { getPhotos } from '../api/photo';
import PhotoViewer from '../components/PhotoViewer';
import FavoriteButton from '../components/FavoriteButton';
import DownloadFavoritesButton from '../components/DownloadFavoritesButton';

function PhotoManagerPage() {
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchPhotos() {
      const data = await getPhotos();
      setPhotos(data);
    }
    fetchPhotos();
  }, []);

  const toggleFavoriteLocal = (photoId) => {
    setFavorites(prev => {
      if (prev.includes(photoId)) {
        return prev.filter(id => id !== photoId);
      } else {
        return [...prev, photoId];
      }
    });
  };

  return (
    <div>
      <h1>사진 관리</h1>
      <DownloadFavoritesButton favoriteIds={favorites} />
      <div>
        {photos.map(photo => (
          <div key={photo.id}>
            <PhotoViewer fileUrl={photo.url} />
            <FavoriteButton
              photoId={photo.id}
              isFavorite={favorites.includes(photo.id)}
              onToggle={toggleFavoriteLocal}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoManagerPage;
