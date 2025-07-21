import React, { useState } from 'react';

export default function ConfluencePageEditor({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="confluence-editor-modal">
      <div className="confluence-editor-card">
        <h2>Crear nueva página</h2>
        <input
          type="text"
          placeholder="Título de la página"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="confluence-editor-title"
        />
        <textarea
          placeholder="Contenido de la página (puedes usar Markdown)"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="confluence-editor-content"
          rows={8}
        />
        <div className="confluence-editor-actions">
          <button className="confluence-btn save" onClick={() => onSave({ title, content })} disabled={!title.trim()}>Guardar</button>
          <button className="confluence-btn cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
