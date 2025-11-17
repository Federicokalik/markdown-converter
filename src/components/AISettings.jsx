import { useState, useEffect } from 'react';
import { getAllProviders, validateApiKey, fetchAvailableModels } from '../utils/aiService';
import {
  saveApiKey,
  getApiKey,
  saveSelectedProvider,
  getSelectedProvider,
  saveSelectedModel,
  getSelectedModel
} from '../utils/crypto';
import './AISettings.css';

const AISettings = ({ onClose, onSave }) => {
  const [selectedProvider, setSelectedProvider] = useState(getSelectedProvider());
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [modelsError, setModelsError] = useState('');

  const providers = getAllProviders();

  // Carica l'API key e il modello salvati quando cambia il provider
  useEffect(() => {
    const savedKey = getApiKey(selectedProvider);
    const savedModel = getSelectedModel(selectedProvider);
    setApiKey(savedKey || '');
    setSelectedModel(savedModel || '');
    setIsSaved(!!savedKey);
    setAvailableModels([]);
    setModelsError('');

    // Se c'è una API key salvata, carica i modelli
    if (savedKey) {
      loadModels(savedKey);
    }
  }, [selectedProvider]);

  // Funzione per caricare i modelli
  const loadModels = async (key) => {
    setIsLoadingModels(true);
    setModelsError('');

    try {
      const models = await fetchAvailableModels(selectedProvider, key);
      setAvailableModels(models);

      // Se non c'è un modello selezionato, seleziona il primo
      if (!selectedModel && models.length > 0) {
        setSelectedModel(models[0].id);
      }
    } catch (error) {
      console.error('Errore nel caricamento modelli:', error);
      setModelsError(`Impossibile caricare i modelli: ${error.message}`);
      setAvailableModels([]);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
    setIsSaved(false);
  };

  const handleLoadModels = async () => {
    if (!apiKey.trim()) {
      alert('Inserisci prima una API key');
      return;
    }

    if (!validateApiKey(selectedProvider, apiKey)) {
      alert('Il formato dell\'API key non sembra corretto per questo provider');
      return;
    }

    await loadModels(apiKey);
  };

  const handleSave = () => {
    if (!apiKey.trim()) {
      alert('Inserisci una API key valida');
      return;
    }

    if (!validateApiKey(selectedProvider, apiKey)) {
      alert('Il formato dell\'API key non sembra corretto per questo provider');
      return;
    }

    if (!selectedModel) {
      alert('Seleziona un modello prima di salvare');
      return;
    }

    // Salva in localStorage (criptato)
    saveApiKey(selectedProvider, apiKey);
    saveSelectedProvider(selectedProvider);
    saveSelectedModel(selectedProvider, selectedModel);
    setIsSaved(true);

    // Notifica il parent component
    if (onSave) {
      onSave(selectedProvider, apiKey, selectedModel);
    }

    alert('Configurazione salvata con successo!');
  };

  const handleClear = () => {
    setApiKey('');
    setSelectedModel('');
    setAvailableModels([]);
    saveApiKey(selectedProvider, '');
    saveSelectedModel(selectedProvider, '');
    setIsSaved(false);
  };

  const currentProvider = providers.find(p => p.id === selectedProvider);

  return (
    <div className="ai-settings-overlay">
      <div className="ai-settings-modal">
        <div className="ai-settings-header">
          <h2>Configurazione AI</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="ai-settings-content">
          {/* Selezione Provider */}
          <div className="settings-group">
            <label>Seleziona Provider AI:</label>
            <select value={selectedProvider} onChange={handleProviderChange}>
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          {/* Informazioni sul provider */}
          <div className="provider-info">
            <h3>Come ottenere l'API key per {currentProvider.name}</h3>
            <div className="info-box">
              {selectedProvider === 'openai' && (
                <>
                  <p><strong>OpenAI</strong></p>
                  <ol>
                    <li>Visita <a href={currentProvider.guideUrl} target="_blank" rel="noopener noreferrer">platform.openai.com/api-keys</a></li>
                    <li>Effettua il login o registrati</li>
                    <li>Clicca su "Create new secret key"</li>
                    <li>Copia la chiave (inizia con "sk-")</li>
                    <li>Incollala qui sotto</li>
                  </ol>
                  <p className="info-note">💡 Consigliato: gpt-4o-mini (economico e veloce)</p>
                </>
              )}

              {selectedProvider === 'deepseek' && (
                <>
                  <p><strong>DeepSeek</strong></p>
                  <ol>
                    <li>Visita <a href={currentProvider.guideUrl} target="_blank" rel="noopener noreferrer">platform.deepseek.com</a></li>
                    <li>Registrati/accedi al tuo account</li>
                    <li>Vai su "API Keys" nel menu</li>
                    <li>Crea una nuova chiave API</li>
                    <li>Copia e incolla la chiave qui</li>
                  </ol>
                  <p className="info-note">💡 DeepSeek offre prezzi molto competitivi</p>
                </>
              )}

              {selectedProvider === 'openrouter' && (
                <>
                  <p><strong>OpenRouter</strong></p>
                  <ol>
                    <li>Visita <a href={currentProvider.guideUrl} target="_blank" rel="noopener noreferrer">openrouter.ai/keys</a></li>
                    <li>Effettua il login (anche con Google)</li>
                    <li>Vai su "Keys" nella dashboard</li>
                    <li>Crea una nuova chiave</li>
                    <li>Copia la chiave generata</li>
                  </ol>
                  <p className="info-note">💡 OpenRouter ti dà accesso a molti modelli diversi</p>
                </>
              )}

              {selectedProvider === 'gemini' && (
                <>
                  <p><strong>Google Gemini</strong></p>
                  <ol>
                    <li>Visita <a href={currentProvider.guideUrl} target="_blank" rel="noopener noreferrer">makersuite.google.com/app/apikey</a></li>
                    <li>Accedi con il tuo account Google</li>
                    <li>Clicca su "Create API Key"</li>
                    <li>Seleziona un progetto Google Cloud (o creane uno nuovo)</li>
                    <li>Copia l'API key generata</li>
                  </ol>
                  <p className="info-note">💡 Gemini offre un tier gratuito generoso</p>
                </>
              )}
            </div>
          </div>

          {/* Input API Key */}
          <div className="settings-group">
            <label>API Key:</label>
            <div className="api-key-input-group">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder={`Inserisci la tua ${currentProvider.name} API key...`}
                className="api-key-input"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="toggle-visibility-btn"
                title={showApiKey ? 'Nascondi' : 'Mostra'}
              >
                {showApiKey ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {isSaved && (
              <p className="success-message">✓ API key salvata (criptata in locale)</p>
            )}
          </div>

          {/* Carica Modelli */}
          <div className="settings-group">
            <button
              onClick={handleLoadModels}
              className="load-models-btn"
              disabled={!apiKey || isLoadingModels}
            >
              {isLoadingModels ? '⏳ Caricamento modelli...' : '🔍 Carica Modelli Disponibili'}
            </button>
          </div>

          {/* Selezione Modello */}
          {availableModels.length > 0 && (
            <div className="settings-group">
              <label>Seleziona Modello AI:</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="model-select"
              >
                <option value="">-- Seleziona un modello --</option>
                {availableModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} {model.pricing ? `(${model.pricing})` : ''}
                  </option>
                ))}
              </select>
              {selectedModel && (
                <p className="model-info">
                  {availableModels.find(m => m.id === selectedModel)?.description}
                </p>
              )}
            </div>
          )}

          {/* Errore modelli */}
          {modelsError && (
            <div className="error-message">
              ⚠️ {modelsError}
            </div>
          )}

          {/* Informazioni sulla sicurezza */}
          <div className="security-info">
            <p>🔒 <strong>Sicurezza:</strong> La tua API key viene salvata localmente nel browser e criptata. Non viene mai inviata a server esterni se non direttamente al provider AI selezionato.</p>
          </div>

          {/* Azioni */}
          <div className="settings-actions">
            <button onClick={handleClear} className="clear-btn">
              Cancella
            </button>
            <button onClick={handleSave} className="save-btn">
              Salva Configurazione
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISettings;
