import { toggleFavorite } from '../api/photo';

function FavoriteButton({ photoId, isFavorite, onToggle }) {
  const handleClick = async () => {
    await toggleFavorite(photoId);
    onToggle(photoId);
  };

  return (
    <button onClick={handleClick}>
      {isFavorite ? '⭐ 해제' : '☆ 즐겨찾기'}
    </button>
  );
}

export default FavoriteButton;
