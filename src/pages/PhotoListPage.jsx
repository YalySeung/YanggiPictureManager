import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

export default function PhotoListPage() {
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchPhotos();
    fetchFavorites();
  }, []);

  const fetchPhotos = async () => {
    const res = await axiosInstance.get('/photos');
    setPhotos(res.data);
  };

  const fetchFavorites = async () => {
    const res = await axiosInstance.get('/favorites');
    setFavorites(res.data); // filename 리스트로 가정
  };

  const isFavorited = (filename) => favorites.includes(filename);

  const toggleFavorite = async (photoId, filename) => {
    const isFav = isFavorited(filename);
    try {
      if (isFav) {
        await axiosInstance.delete(`/favorites/${photoId}`);
      } else {
        await axiosInstance.post(`/favorites/${photoId}`);
      }
      fetchFavorites();
    } catch (e) {
      alert('즐겨찾기 처리 실패');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">📸 사진 목록</h2>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map(photo => (
          <li key={photo.photoId} className="border p-2 rounded shadow-sm relative">
            <button
              className={`absolute top-2 right-2 text-xl ${
                isFavorited(photo.filename) ? 'text-yellow-400' : 'text-gray-400'
              }`}
              onClick={() => toggleFavorite(photo.photoId, photo.filename)}
              title={isFavorited(photo.filename) ? '즐겨찾기 제거' : '즐겨찾기 추가'}
            >
              ★
            </button>

            <Link to={`/photos/view/${photo.photoId}`}>
              <img
                src={`/uploads/${photo.filename}`}
                alt={photo.originalName}
                className="w-full h-40 object-cover rounded mb-2"
              />
            </Link>
            <div className="text-sm truncate">{photo.originalName}</div>
            <div className="text-xs text-gray-500">{photo.tag}</div>
            <Link
              to={`/tags/${photo.photoId}`}
              className="text-xs bg-indigo-500 text-white px-2 py-1 mt-1 inline-block rounded"
            >
              태그 관리
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
