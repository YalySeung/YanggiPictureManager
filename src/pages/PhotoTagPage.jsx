import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

export default function PhotoTagPage() {
    const { photoId } = useParams();
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
  
    useEffect(() => {
      fetchTags();
    }, []);
  
    const fetchTags = async () => {
      try {
        const res = await axiosInstance.get(`/tags/${photoId}`);
        setTags(res.data);
      } catch (e) {
        alert('태그 불러오기 실패');
      }
    };
  
    const addTag = async () => {
      if (!newTag.trim()) return;
      try {
        await axiosInstance.post(`/tags/${photoId}?tag=${encodeURIComponent(newTag)}`);
        setNewTag('');
        fetchTags();
      } catch (e) {
        alert('태그 추가 실패');
      }
    };
  
    const deleteTag = async (tag) => {
      try {
        await axiosInstance.delete(`/tags/${photoId}?tag=${encodeURIComponent(tag)}`);
        fetchTags();
      } catch (e) {
        alert('태그 삭제 실패');
      }
    };
  
    return (
      <div className="p-4">
        <h2 className="text-xl mb-4">사진 {photoId}의 태그 관리</h2>
  
        <ul className="mb-4 space-y-1">
          {tags.map(tag => (
            <li key={tag.tag} className="flex items-center justify-between border p-2 rounded">
              <span>{tag.tag}</span>
              <button className="text-red-500 text-sm" onClick={() => deleteTag(tag.tag)}>삭제</button>
            </li>
          ))}
        </ul>
  
        <div className="flex gap-2">
          <input
            className="border p-2 flex-1"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            placeholder="새 태그 입력"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addTag}>
            추가
          </button>
        </div>
      </div>
    );
  }