import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function FavoritePage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axiosInstance.get('/favorites')
      .then(res => setFiles(res.data))
      .catch(() => alert('즐겨찾기 불러오기 실패'));
  }, []);

  const downloadZip = async () => {
    const res = await axiosInstance.post('/photos/download/zip', files, {
      responseType: 'blob'
    });
    const url = URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favorites.zip';
    a.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">즐겨찾기 목록</h2>
      <ul className="mb-4">
        {files.map(name => <li key={name}>{name}</li>)}
      </ul>
      <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={downloadZip}>ZIP 다운로드</button>
    </div>
  );
}
