/**
 * Utility per crittografia/decrittografia delle API keys
 * Usa un semplice XOR con una chiave derivata dal browser
 */

// Genera una chiave basata su dati del browser (non perfetta ma migliore di plain text)
const getDeviceKey = () => {
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const platform = navigator.platform;
  const baseKey = `${userAgent}-${language}-${platform}`;

  // Crea un hash semplice
  let hash = 0;
  for (let i = 0; i < baseKey.length; i++) {
    const char = baseKey.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

/**
 * Cripta una stringa usando XOR
 */
export const encrypt = (text) => {
  if (!text) return '';

  const key = getDeviceKey();
  let encrypted = '';

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    encrypted += String.fromCharCode(charCode);
  }

  // Converti in base64 per renderlo salvabile
  return btoa(encrypted);
};

/**
 * Decripta una stringa
 */
export const decrypt = (encryptedText) => {
  if (!encryptedText) return '';

  try {
    const key = getDeviceKey();
    const encrypted = atob(encryptedText);
    let decrypted = '';

    for (let i = 0; i < encrypted.length; i++) {
      const charCode = encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      decrypted += String.fromCharCode(charCode);
    }

    return decrypted;
  } catch (error) {
    console.error('Errore nella decrittazione:', error);
    return '';
  }
};

/**
 * Salva API key in localStorage (criptata)
 */
export const saveApiKey = (provider, apiKey) => {
  const encrypted = encrypt(apiKey);
  localStorage.setItem(`ai_key_${provider}`, encrypted);
};

/**
 * Recupera API key da localStorage (decriptata)
 */
export const getApiKey = (provider) => {
  const encrypted = localStorage.getItem(`ai_key_${provider}`);
  return decrypt(encrypted);
};

/**
 * Salva il provider selezionato
 */
export const saveSelectedProvider = (provider) => {
  localStorage.setItem('ai_selected_provider', provider);
};

/**
 * Recupera il provider selezionato
 */
export const getSelectedProvider = () => {
  return localStorage.getItem('ai_selected_provider') || 'openai';
};

/**
 * Rimuove l'API key di un provider
 */
export const removeApiKey = (provider) => {
  localStorage.removeItem(`ai_key_${provider}`);
};
