import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

export default function PhotoViewPage() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/photos/${photoId}`) // GET /api/photos/{id}
      .then(res => setPhoto(res.data))
      .catch(() => alert('사진 정보를 불러오지 못했습니다.'));
  }, []);

  if (!photo) return <div className="p-4">불러오는 중...</div>;

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl mb-4">{photo.originalName}</h2>
      <img
        src={`/uploads/${photo.filename}`}
        alt={photo.originalName}
        className="max-w-full max-h-[80vh] mx-auto rounded shadow"
      />
      <div className="mt-2 text-gray-500 text-sm">태그: {photo.tag || '(없음)'}</div>
    </div>
  );
}
