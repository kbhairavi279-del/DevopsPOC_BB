import React from 'react';

export default function Menu({ onSelect }) {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '2rem' }}>
      <button onClick={() => onSelect('upload')}>Excel to JSON</button>
    </nav>
  );
}
