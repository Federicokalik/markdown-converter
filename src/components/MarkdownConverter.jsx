import { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import FileUpload from './FileUpload';
import AISettings from './AISettings';
import { convertText } from '../utils/converter';
import { improveTextWithAI } from '../utils/aiService';
import { getApiKey, getSelectedProvider, getSelectedModel } from '../utils/crypto';
import './MarkdownConverter.css';

const MarkdownConverter = () => {
  const [inputType, setInputType] = useState('html'); // html, plain, markdown
  const [outputFormat, setOutputFormat] = useState('markdown'); // markdown, markdoc, mdx
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [referenceContent, setReferenceContent] = useState('');
  const [showReference, setShowReference] = useState(false);
  const [useRichEditor, setUseRichEditor] = useState(true);
  const [showAISettings, setShowAISettings] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);

  // Gestisce il caricamento del file di riferimento
  const handleFileLoad = (content, filename) => {
    setReferenceContent(content);
    setShowReference(true);
  };

  // Esegue la conversione
  const handleConvert = () => {
    const result = convertText(inputText, inputType, outputFormat);
    setOutputText(result);
  };

  // Copia il risultato negli appunti
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      alert('Testo copiato negli appunti!');
    } catch (err) {
      console.error('Errore nella copia:', err);
      alert('Errore nella copia del testo');
    }
  };

  // Scarica il risultato come file
  const handleDownload = () => {
    if (!outputText) return;

    const extensions = {
      markdown: '.md',
      markdoc: '.markdoc',
      mdx: '.mdx'
    };

    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted${extensions[outputFormat]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Migliora il testo con AI
  const handleImproveWithAI = async () => {
    const provider = getSelectedProvider();
    const apiKey = getApiKey(provider);
    const model = getSelectedModel(provider);

    if (!apiKey) {
      const shouldOpenSettings = window.confirm(
        'Nessuna API key configurata. Vuoi configurare l\'AI ora?'
      );
      if (shouldOpenSettings) {
        setShowAISettings(true);
      }
      return;
    }

    if (!model) {
      const shouldOpenSettings = window.confirm(
        'Nessun modello AI selezionato. Vuoi configurare l\'AI ora?'
      );
      if (shouldOpenSettings) {
        setShowAISettings(true);
      }
      return;
    }

    if (!inputText) {
      alert('Inserisci del testo prima di usare l\'AI');
      return;
    }

    setIsAIProcessing(true);

    try {
      // Estrai il testo plain se è HTML (dall'editor)
      let textToImprove = inputText;
      if (useRichEditor && inputType === 'html') {
        // Crea un elemento temporaneo per estrarre il testo
        const temp = document.createElement('div');
        temp.innerHTML = inputText;
        textToImprove = temp.textContent || temp.innerText || inputText;
      }

      const improvedText = await improveTextWithAI(
        textToImprove,
        provider,
        apiKey,
        model,
        outputFormat
      );

      setOutputText(improvedText);
      alert('✓ Testo migliorato con successo!');

    } catch (error) {
      console.error('Errore AI:', error);
      alert(`Errore nell'elaborazione AI: ${error.message}`);
    } finally {
      setIsAIProcessing(false);
    }
  };

  return (
    <div className="markdown-converter">
      {/* Controlli superiori */}
      <div className="controls-section">
        <div className="control-group">
          <label>Tipo di input:</label>
          <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
            <option value="plain">Testo Plain</option>
            <option value="html">HTML</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>

        <div className="control-group">
          <label>Formato di output:</label>
          <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
            <option value="markdown">Markdown</option>
            <option value="markdoc">Markdoc</option>
            <option value="mdx">MDX</option>
          </select>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={useRichEditor}
              onChange={(e) => setUseRichEditor(e.target.checked)}
            />
            Usa editor visuale
          </label>
        </div>

        <div className="control-group ai-controls">
          <button onClick={() => setShowAISettings(true)} className="ai-settings-btn">
            ⚙️ Configura AI
          </button>
        </div>
      </div>

      {/* File upload */}
      <FileUpload onFileLoad={handleFileLoad} />

      {/* Area di conversione principale */}
      <div className="conversion-area">
        {/* Input */}
        <div className="input-section">
          <h3>Input</h3>
          {useRichEditor ? (
            <RichTextEditor
              value={inputText}
              onChange={setInputText}
            />
          ) : (
            <textarea
              className="text-area"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Incolla qui il tuo testo..."
            />
          )}
        </div>

        {/* Output */}
        <div className="output-section">
          <h3>Output ({outputFormat})</h3>
          <textarea
            className="text-area output-area"
            value={outputText}
            readOnly
            placeholder="Il risultato della conversione apparirà qui..."
          />
          <div className="output-actions">
            <button onClick={handleCopy} disabled={!outputText}>
              Copia
            </button>
            <button onClick={handleDownload} disabled={!outputText}>
              Scarica
            </button>
          </div>
        </div>
      </div>

      {/* Bottoni di conversione */}
      <div className="convert-button-container">
        <button
          onClick={handleImproveWithAI}
          className="ai-improve-button"
          disabled={!inputText || isAIProcessing}
        >
          {isAIProcessing ? '🤖 Elaborazione AI...' : '✨ Migliora con AI'}
        </button>
        <button onClick={handleConvert} className="convert-button" disabled={!inputText}>
          Converti
        </button>
      </div>

      {/* File di riferimento (se caricato) */}
      {showReference && (
        <div className="reference-section">
          <div className="reference-header">
            <h3>File di riferimento</h3>
            <button onClick={() => setShowReference(false)} className="close-button">
              ✕
            </button>
          </div>
          <RichTextEditor
            value={referenceContent}
            onChange={setReferenceContent}
            title="Modifica il tuo file di riferimento"
          />
        </div>
      )}

      {/* Modal Impostazioni AI */}
      {showAISettings && (
        <AISettings
          onClose={() => setShowAISettings(false)}
          onSave={() => {}}
        />
      )}
    </div>
  );
};

export default MarkdownConverter;
