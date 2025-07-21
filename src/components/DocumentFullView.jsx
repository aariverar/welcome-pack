import React, { useEffect, useRef } from 'react';
import { pdfjs } from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

export default function DocumentFullView({ file, onClose }) {
  if (!file) return null;
  const pdfContainerRef = useRef(null);
  const [pdfError, setPdfError] = React.useState(null);
  // Previene errores globales si pdfjs no está disponible
  const isPdfjsAvailable = typeof pdfjs !== 'undefined' && pdfjs.getDocument;

  useEffect(() => {
    setPdfError(null);
    if (file && file.name.match(/\.pdf$/i) && pdfContainerRef.current && isPdfjsAvailable) {
      try {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
        const loadingTask = pdfjs.getDocument(file.url);
        loadingTask.promise.then(pdf => {
          pdfContainerRef.current.innerHTML = '';
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(page => {
              const viewport = page.getViewport({ scale: 1.2 });
              const canvas = document.createElement('canvas');
              canvas.style.display = 'block';
              canvas.style.margin = '0 auto 1em auto';
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              pdfContainerRef.current.appendChild(canvas);
              page.render({ canvasContext: context, viewport });
            }).catch(err => {
              setPdfError('No se pudo renderizar la página del PDF.');
            });
          }
        }).catch(err => {
          setPdfError('No se pudo cargar el PDF. El archivo puede estar corrupto o el formato no es compatible.');
        });
      } catch (err) {
        setPdfError('Error interno al intentar renderizar el PDF.');
      }
    }
  }, [file]);

  return (
    <div className="confluence-editor-modal" style={{zIndex:2000}}>
      <div className="confluence-editor-card" style={{maxWidth:'900px',background:'#fff',boxShadow:'0 8px 32px rgba(254,0,0,0.18)',border:'2px solid #FE0000',padding:'2rem 2.5rem',overflow:'hidden'}}>
        <h2 style={{color:'#FE0000',marginBottom:'1em',display:'flex',alignItems:'center',gap:'0.5em'}}>
          <span style={{fontSize:'1.5em'}}>
            {file.name.match(/\.pdf$/i) ? '📄' :
             file.name.match(/\.docx?$|\.doc$/i) ? '📝' :
             file.name.match(/\.xlsx?$|\.xls$/i) ? '📊' :
             file.name.match(/\.pptx?$|\.ppt$/i) ? '📈' :
             '📁'}
          </span>
          {file.name}
        </h2>
        {file.name.match(/\.pdf$/i) ? (
          <div style={{background:'#f8f8f8',border:'1px solid #ddd',borderRadius:'8px',height:'700px',overflow:'auto',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',marginBottom:'1em'}}>
            {!isPdfjsAvailable ? (
              <div style={{color:'#FE0000',padding:'2em',textAlign:'center'}}>No se pudo cargar el visor PDF. Intenta recargar la página o revisa la instalación.</div>
            ) : pdfError ? (
              <>
                <div style={{color:'#FE0000',padding:'2em',textAlign:'center'}}>{pdfError}</div>
                <iframe src={file.url} title={file.name} style={{width:'100%',height:'100%',border:'none',borderRadius:'8px'}} />
              </>
            ) : (
              <div ref={pdfContainerRef} style={{width:'100%',height:'100%',overflow:'auto'}} />
            )}
          </div>
        ) : (
          <div style={{background:'#fff',border:'1px solid #ddd',borderRadius:'8px',padding:'2em',marginBottom:'1em',color:'#FE0000',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <span style={{fontSize:'2em',display:'block',marginBottom:'0.5em'}}>
              {file.name.match(/\.docx?$|\.doc$/i) ? '📝' :
               file.name.match(/\.xlsx?$|\.xls$/i) ? '📊' :
               file.name.match(/\.pptx?$|\.ppt$/i) ? '📈' :
               '⚠️'}
            </span>
            <div style={{marginTop:'0.5em'}}>
              {file.name.match(/\.docx?$|\.doc$/i) ? 'No se puede previsualizar archivos Word (.doc/.docx).' :
               file.name.match(/\.xlsx?$|\.xls$/i) ? 'No se puede previsualizar archivos Excel (.xls/.xlsx).' :
               file.name.match(/\.pptx?$|\.ppt$/i) ? 'No se puede previsualizar archivos PowerPoint (.ppt/.pptx).' :
               'No se puede previsualizar este tipo de archivo.'}
            </div>
            <a href={file.url} download={file.name} className="confluence-btn" style={{marginTop:'1em',display:'inline-block'}}>Descargar</a>
          </div>
        )}
        <button className="confluence-btn cancel" style={{marginTop:'1em'}} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
