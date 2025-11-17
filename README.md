# Markdown Converter

Una web app moderna per convertire testo plain (da Word, PDF, ecc.) o HTML in Markdown, Markdoc o MDX.

## Caratteristiche

- **Conversione multipla**: Supporta la conversione da testo plain e HTML verso Markdown, Markdoc e MDX
- **🤖 AI-Powered Formatting**: Migliora automaticamente la struttura del testo usando modelli LLM
- **Multi-provider AI**: Supporta OpenAI, DeepSeek, OpenRouter e Google Gemini
- **Editor visuale integrato**: Editor rich text tipo TinyMCE basato su React Quill per un'esperienza di editing migliorata
- **Modalità dual-view**: Scegli tra editor visuale o textarea semplice
- **Caricamento file**: Carica file .md, .markdown, .mdx o .markdoc come riferimento
- **Editing del riferimento**: Modifica direttamente i file di riferimento caricati nell'editor integrato
- **Copia e download**: Copia facilmente il risultato negli appunti o scaricalo come file
- **🔒 Sicurezza**: API keys salvate localmente e criptate nel browser
- **Interfaccia moderna**: Design pulito e responsive con gradiente viola

## Stack Tecnologico

- **React 18** - Framework UI
- **Vite** - Build tool e dev server
- **Turndown** - Conversione HTML → Markdown
- **React Quill** - Editor rich text WYSIWYG
- **CSS3** - Styling moderno con gradients e animazioni

## Installazione

```bash
# Clona il repository
git clone <repository-url>
cd markdown-converter

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview della build di produzione
npm run preview
```

## Utilizzo

### Conversione Base

1. **Seleziona il tipo di input**: Scegli tra Testo Plain, HTML o Markdown
2. **Seleziona il formato di output**: Scegli tra Markdown, Markdoc o MDX
3. **Incolla o scrivi il tuo testo**: Usa l'editor visuale o la textarea semplice
4. **Carica un file di riferimento** (opzionale): Carica un file .md/.mdx/.markdoc esistente per usarlo come riferimento o template
5. **Clicca "Converti"**: Il testo convertito apparirà nella sezione di output
6. **Copia o scarica**: Usa i pulsanti per copiare il risultato o scaricarlo come file

### Miglioramento con AI

Per testi non formattati correttamente (senza titoli, liste, ecc.), usa la funzionalità AI:

1. **Configura AI** (prima volta):
   - Clicca su "⚙️ Configura AI"
   - Seleziona un provider (OpenAI, DeepSeek, OpenRouter, Gemini)
   - Segui le istruzioni per ottenere l'API key del provider scelto
   - Inserisci l'API key e clicca "Salva Configurazione"

2. **Usa AI per migliorare il testo**:
   - Incolla il tuo testo non formattato nell'area input
   - Clicca su "✨ Migliora con AI"
   - L'AI analizzerà il testo e aggiungerà automaticamente:
     - Titoli e sottotitoli appropriati
     - Elenchi puntati/numerati dove opportuno
     - Enfasi (grassetto/corsivo) per parole chiave
     - Separazione logica in paragrafi
     - Formattazione di codice se presente

3. **Note sulla sicurezza**:
   - Le API keys sono salvate localmente nel browser (localStorage)
   - Le chiavi sono criptate usando un algoritmo XOR
   - Non vengono mai inviate a server esterni (solo al provider AI selezionato)

## Formati Supportati

### Input
- **Testo Plain**: Testo copiato da Word, PDF o qualsiasi editor di testo
- **HTML**: Codice HTML con formattazione
- **Markdown**: Markdown esistente (per conversione in Markdoc/MDX)

### Output
- **Markdown**: Standard Markdown con sintassi ATX per headers
- **Markdoc**: Markdown con frontmatter YAML
- **MDX**: Markdown + JSX, con supporto per componenti React

## Provider AI Supportati

| Provider | Modello | Come ottenere API key | Note |
|----------|---------|----------------------|------|
| **OpenAI** | gpt-4o-mini | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | Raccomandato per qualità/prezzo |
| **DeepSeek** | deepseek-chat | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) | Prezzi molto competitivi |
| **OpenRouter** | gpt-4o-mini | [openrouter.ai/keys](https://openrouter.ai/keys) | Accesso a molti modelli diversi |
| **Google Gemini** | gemini-1.5-flash | [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey) | Tier gratuito generoso |

### Formato API Keys

- **OpenAI/DeepSeek/OpenRouter**: Iniziano con `sk-`
- **Gemini**: Chiave alfanumerica lunga

## Funzionalità dell'Editor

L'editor visuale include:
- Headers (H1-H6)
- Grassetto, corsivo, sottolineato, barrato
- Liste ordinate e non ordinate
- Indentazione
- Link e immagini
- Blocchi di codice
- Allineamento testo

## Struttura del Progetto

```
markdown-converter/
├── src/
│   ├── components/
│   │   ├── MarkdownConverter.jsx  # Componente principale
│   │   ├── RichTextEditor.jsx     # Editor rich text
│   │   ├── FileUpload.jsx         # Componente upload file
│   │   ├── AISettings.jsx         # Configurazione AI
│   │   └── *.css                  # Stili componenti
│   ├── utils/
│   │   ├── converter.js           # Logica di conversione
│   │   ├── aiService.js           # Integrazione AI multi-provider
│   │   └── crypto.js              # Crittografia API keys
│   ├── App.jsx                    # App principale
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Stili globali
├── index.html
├── vite.config.js
└── package.json
```

## Licenza

GPL-3.0

## Contribuire

Contributi, issues e feature requests sono benvenuti!
