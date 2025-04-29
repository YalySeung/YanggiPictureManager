// src/api/photo.js
import axiosInstance from '../utils/axiosInstance.js';

// 사진 리스트 가져오기
export async function getPhotos() {
  try {
    const response = await axiosInstance.get('/photos');
    return response.data; // [{ id, url, tags, name }]
  } catch (error) {
    console.error('사진 가져오기 실패', error);
    return [];
  }
}

// 즐겨찾기 토글 (추가 또는 해제)
export async function toggleFavorite(photoId) {
  try {
    const response = await axiosInstance.post(`/photos/${photoId}/favorite`);
    return response.data; // 성공 여부 반환 (true/false)
  } catch (error) {
    console.error('즐겨찾기 변경 실패', error);
    return false;
  }
}

// 파일 업로드
export async function uploadPhoto(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosInstance.post('/photos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('파일 업로드 실패', error);
    return null;
  }
}
