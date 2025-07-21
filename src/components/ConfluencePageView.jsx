import React from 'react';

export default function ConfluencePageView({ page, onBack }) {
  if (!page) return null;
  return (
    <div className="confluence-view">
      <button className="confluence-btn back" onClick={onBack}>← Volver</button>
      <h2>{page.title}</h2>
      <div className="confluence-content-view">
        {page.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  );
}
