import React from 'react';

export default function ConfluencePageList({ pages, onSelect }) {
  if (!pages.length) return <div className="confluence-empty">No hay páginas creadas aún.</div>;
  return (
    <div className="confluence-list">
      {pages.map((page, idx) => (
        <div key={idx} className="confluence-list-item" onClick={() => onSelect(page)}>
          <h3>{page.title}</h3>
          <p>{page.content.slice(0, 80)}{page.content.length > 80 ? '...' : ''}</p>
        </div>
      ))}
    </div>
  );
}
