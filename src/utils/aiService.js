/**
 * Servizio per integrare diversi provider AI
 */

// Configurazione degli endpoint per ogni provider
const AI_PROVIDERS = {
  openai: {
    name: 'OpenAI',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    guideUrl: 'https://platform.openai.com/api-keys',
  },
  deepseek: {
    name: 'DeepSeek',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    guideUrl: 'https://platform.deepseek.com/api_keys',
  },
  openrouter: {
    name: 'OpenRouter',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'openai/gpt-4o-mini',
    guideUrl: 'https://openrouter.ai/keys',
  },
  gemini: {
    name: 'Google Gemini',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    model: 'gemini-1.5-flash',
    guideUrl: 'https://makersuite.google.com/app/apikey',
  }
};

/**
 * Crea il prompt per formattare il testo
 */
const createFormattingPrompt = (text, outputFormat) => {
  return `Sei un esperto di formattazione markdown. Il tuo compito è analizzare il seguente testo e migliorarlo strutturalmente aggiungendo:

1. Titoli e sottotitoli appropriati (usando # ## ### ecc.)
2. Elenchi puntati o numerati dove appropriato
3. Enfasi (grassetto, corsivo) per parole chiave
4. Separazione logica in paragrafi
5. Eventuale formattazione di codice se presente
6. Link se ci sono URL

Il testo di output deve essere in formato ${outputFormat.toUpperCase()}.

NON modificare il contenuto sostanziale del testo, solo migliorarne la struttura e formattazione.
NON aggiungere introduzioni o conclusioni che non erano presenti.
Restituisci SOLO il testo formattato, senza spiegazioni aggiuntive.

TESTO DA FORMATTARE:
${text}`;
};

/**
 * Formatta la richiesta per OpenAI
 */
const formatOpenAIRequest = (provider, apiKey, prompt) => {
  const config = AI_PROVIDERS[provider];

  return {
    url: config.endpoint,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      ...(provider === 'openrouter' && {
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Markdown Converter'
      })
    },
    body: {
      model: config.model,
      messages: [
        {
          role: 'system',
          content: 'Sei un esperto di formattazione markdown. Migliora la struttura del testo mantenendo il contenuto originale.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 4000
    }
  };
};

/**
 * Formatta la richiesta per Gemini (usa formato diverso)
 */
const formatGeminiRequest = (apiKey, prompt) => {
  const config = AI_PROVIDERS.gemini;

  return {
    url: `${config.endpoint}?key=${apiKey}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 4000,
      }
    }
  };
};

/**
 * Estrae il testo dalla risposta del provider
 */
const extractResponseText = (provider, data) => {
  if (provider === 'gemini') {
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } else {
    // OpenAI, DeepSeek, OpenRouter usano lo stesso formato
    return data.choices?.[0]?.message?.content || '';
  }
};

/**
 * Funzione principale per migliorare il testo con AI
 */
export const improveTextWithAI = async (text, provider, apiKey, outputFormat = 'markdown') => {
  if (!text || !apiKey) {
    throw new Error('Testo e API key sono richiesti');
  }

  if (!AI_PROVIDERS[provider]) {
    throw new Error(`Provider ${provider} non supportato`);
  }

  const prompt = createFormattingPrompt(text, outputFormat);

  try {
    let requestConfig;

    // Formatta la richiesta in base al provider
    if (provider === 'gemini') {
      requestConfig = formatGeminiRequest(apiKey, prompt);
    } else {
      requestConfig = formatOpenAIRequest(provider, apiKey, prompt);
    }

    // Esegui la chiamata API
    const response = await fetch(requestConfig.url, {
      method: 'POST',
      headers: requestConfig.headers,
      body: JSON.stringify(requestConfig.body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message ||
        errorData.error ||
        `Errore API (${response.status}): ${response.statusText}`
      );
    }

    const data = await response.json();
    const improvedText = extractResponseText(provider, data);

    if (!improvedText) {
      throw new Error('Nessuna risposta ricevuta dall\'AI');
    }

    return improvedText;

  } catch (error) {
    console.error('Errore nella chiamata AI:', error);
    throw error;
  }
};

/**
 * Ottiene la configurazione di un provider
 */
export const getProviderConfig = (provider) => {
  return AI_PROVIDERS[provider];
};

/**
 * Ottiene la lista di tutti i provider
 */
export const getAllProviders = () => {
  return Object.entries(AI_PROVIDERS).map(([id, config]) => ({
    id,
    ...config
  }));
};

/**
 * Valida un'API key (controllo base di formato)
 */
export const validateApiKey = (provider, apiKey) => {
  if (!apiKey || apiKey.trim().length < 10) {
    return false;
  }

  // Validazioni specifiche per provider
  switch (provider) {
    case 'openai':
      return apiKey.startsWith('sk-');
    case 'deepseek':
      return apiKey.startsWith('sk-');
    case 'openrouter':
      return apiKey.startsWith('sk-');
    case 'gemini':
      // Gemini usa chiavi diverse
      return apiKey.length > 20;
    default:
      return true;
  }
};
