// src/components/PhotoCard.jsx
import React from 'react';

function PhotoCard({ photo, isFavorite, toggleFavorite }) {
  const isPdf = photo.url.endsWith('.pdf');

  return (
    <div className="photo-card">
      <div className="photo-preview">
        {isPdf ? (
          <div className="pdf-placeholder">PDF</div>
        ) : (
          <img src={photo.url} alt="사진" />
        )}
      </div>
      <div className="photo-footer">
        <span>{photo.name}</span>
        <button
          className={`favorite-button ${isFavorite ? '' : 'inactive'}`}
          onClick={() => toggleFavorite(photo.id)}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;
