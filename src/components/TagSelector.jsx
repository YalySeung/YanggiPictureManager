// src/components/TagSelector.jsx
import React, { useState } from 'react';

function TagSelector({ setSelectedTag }) {
  const tags = ['all', '여행', '가족', '친구', '풍경', '기타'];
  const [activeTag, setActiveTag] = useState('all');

  const handleSelect = (tag) => {
    setSelectedTag(tag);
    setActiveTag(tag);
  };

  return (
    <div className="tag-selector">
      {tags.map(tag => (
        <button
          key={tag}
          className={activeTag === tag ? 'active' : ''}
          onClick={() => handleSelect(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagSelector;
