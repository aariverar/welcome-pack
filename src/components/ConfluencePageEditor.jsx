import React, { useState } from 'react';

export default function ConfluencePageEditor({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  function handleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setFilePreviews(selectedFiles.map(file => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file)
    })));
  }

  return (
    <div className="confluence-editor-modal">
      <div className="confluence-editor-card">
        <h2 style={{color:'#FE0000',marginBottom:'1em'}}>Crear nueva página</h2>
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
        <div style={{margin:'1em 0'}}>
          <label style={{fontWeight:'bold',color:'#FE0000'}}>Adjuntar archivos (.pdf, .docx, .ppt):</label>
          <input type="file" multiple accept=".pdf,.docx,.ppt,.pptx" onChange={handleFileChange} style={{marginTop:'0.5em'}} />
          <div style={{marginTop:'1em'}}>
            {filePreviews.map((file, idx) => (
              <div key={idx} style={{marginBottom:'0.5em',background:'#f8f8f8',borderRadius:'8px',padding:'0.5em 1em',display:'flex',alignItems:'center',gap:'0.7em'}}>
                <span style={{fontSize:'1.5em'}}>
                  {file.name.match(/\.pdf$/i) ? '📄' :
                   file.name.match(/\.docx?$/i) ? '📝' :
                   file.name.match(/\.pptx?$/i) ? '📈' :
                   '📁'}
                </span>
                <span style={{color:'#FE0000',fontWeight:'500'}}>{file.name}</span>
                {file.type === 'application/pdf' ? (
                  <a href={file.url} target="_blank" rel="noopener noreferrer" style={{marginLeft:'auto',color:'#FE0000',textDecoration:'underline'}}>Ver PDF</a>
                ) : (
                  <a href={file.url} download={file.name} style={{marginLeft:'auto',color:'#FE0000',textDecoration:'underline'}}>Descargar</a>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="confluence-editor-actions">
          <button className="confluence-btn save" onClick={() => onSave({ title, content, files })} disabled={!title.trim()}>Guardar</button>
          <button className="confluence-btn cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
