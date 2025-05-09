// src/api/photo.js
import axiosInstance from '../utils/axiosInstance.js';

// 사진 리스트 가져오기
export async function getPhotos() {
  try {
    const response = await axiosInstance.get('/api/photos');
    return response.data; // [{ id, url, tags, name }]
  } catch (error) {
    console.error('사진 가져오기 실패', error);
    return [];
  }
}

export async function addFavorite(photoId) {
  try {
    await axiosInstance.post(`/api/favorites/${photoId}`);
    return true;
  } catch (e) {
    console.error('즐겨찾기 추가 실패:', e);
    return false;
  }
}

export async function removeFavorite(photoId) {
  try {
    await axiosInstance.delete(`/api/favorites/${photoId}`);
    return true;
  } catch (e) {
    console.error('즐겨찾기 제거 실패:', e);
    return false;
  }
}

// 파일 업로드
export async function uploadPhoto(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axiosInstance.post('/api/photos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data; // 저장된 파일명(uuid)
  } catch (e) {
    console.error('업로드 실패:', e);
    return null;
  }
}

export async function downloadZip(filenames) {
  try {
    const res = await axiosInstance.post('/api/photos/download/zip', filenames, {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favorites.zip';
    a.click();
  } catch (e) {
    console.error('ZIP 다운로드 실패:', e);
  }
}

export async function getTags(photoId) {
  const res = await axiosInstance.get(`/api/tags/${photoId}`);
  return res.data;
}

export async function addTag(photoId, tag) {
  return axiosInstance.post(`/api/tags/${photoId}?tag=${encodeURIComponent(tag)}`);
}

export async function deleteTag(photoId, tag) {
  return axiosInstance.delete(`/api/tags/${photoId}?tag=${encodeURIComponent(tag)}`);
}