import axiosInstance from '../utils/axiosInstance';

export async function getPhotos() {
  const response = await axiosInstance.get('/photos');
  return response.data;
}

export async function toggleFavorite(photoId) {
  await axiosInstance.post(`/photos/${photoId}/favorite`);
}
