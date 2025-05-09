import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function PhotoUploadPage() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axiosInstance.post('/photos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('업로드 성공: ' + res.data);
    } catch (e) {
      alert('업로드 실패');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">사진 업로드</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button className="ml-2 bg-green-500 text-white px-4 py-1 rounded" onClick={upload}>업로드</button>
    </div>
  );
}
