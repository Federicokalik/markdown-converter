import { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ onFileLoad }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Verifica che sia un file markdown/markdoc/mdx
    const validExtensions = ['.md', '.markdown', '.mdx', '.markdoc'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      alert('Per favore carica un file .md, .markdown, .mdx o .markdoc');
      return;
    }

    setFileName(file.name);

    // Leggi il contenuto del file
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onFileLoad(content, file.name);
    };
    reader.onerror = (error) => {
      console.error('Errore nella lettura del file:', error);
      alert('Errore nella lettura del file');
    };
    reader.readAsText(file);
  };

  return (
    <div className="file-upload">
      <label htmlFor="file-input" className="file-upload-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span>Carica file di riferimento</span>
      </label>
      <input
        id="file-input"
        type="file"
        accept=".md,.markdown,.mdx,.markdoc"
        onChange={handleFileChange}
        className="file-input-hidden"
      />
      {fileName && (
        <div className="file-name">
          File caricato: <strong>{fileName}</strong>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
