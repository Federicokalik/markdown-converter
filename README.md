# Markdown Converter

Una web app moderna per convertire testo plain (da Word, PDF, ecc.) o HTML in Markdown, Markdoc o MDX.

## Caratteristiche

- **Conversione multipla**: Supporta la conversione da testo plain e HTML verso Markdown, Markdoc e MDX
- **🤖 AI-Powered Formatting**: Migliora automaticamente la struttura del testo usando modelli LLM
- **Multi-provider AI**: Supporta OpenAI, DeepSeek, OpenRouter e Google Gemini
- **🔍 Selezione dinamica modelli**: Carica e scegli tra tutti i modelli disponibili per ogni provider
- **Editor visuale integrato**: Editor rich text tipo TinyMCE basato su React Quill per un'esperienza di editing migliorata
- **Modalità dual-view**: Scegli tra editor visuale o textarea semplice
- **Caricamento file**: Carica file .md, .markdown, .mdx o .markdoc come riferimento
- **Editing del riferimento**: Modifica direttamente i file di riferimento caricati nell'editor integrato
- **Copia e download**: Copia facilmente il risultato negli appunti o scaricalo come file
- **🔒 Sicurezza**: API keys salvate localmente e criptate nel browser
- **Interfaccia moderna**: Design pulito e responsive con gradienti colorati

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

#### 1. Configura AI (prima volta)

**Passo 1 - Apri configurazione:**
- Clicca sul bottone **"⚙️ Configura AI"** in alto a destra

**Passo 2 - Seleziona provider:**
- Scegli tra OpenAI, DeepSeek, OpenRouter o Google Gemini
- Leggi le istruzioni specifiche per ottenere l'API key

**Passo 3 - Inserisci API key:**
- Visita il link fornito per ottenere la tua API key
- Copia e incolla la chiave nell'apposito campo
- Puoi mostrare/nascondere la chiave con l'icona 👁️

**Passo 4 - Carica modelli disponibili:**
- Clicca sul bottone verde **"🔍 Carica Modelli Disponibili"**
- L'app recupererà automaticamente tutti i modelli compatibili
- Attendi il caricamento (indicatore ⏳)

**Passo 5 - Seleziona modello:**
- Dal dropdown "Seleziona Modello AI" scegli il modello preferito
- Per OpenRouter vedrai anche i prezzi (es: "$0.15/1M tokens")
- Leggi la descrizione del modello selezionato

**Passo 6 - Salva configurazione:**
- Clicca **"Salva Configurazione"**
- La configurazione viene salvata localmente e criptata

#### 2. Usa AI per migliorare il testo

- Incolla il tuo testo non formattato nell'area input
- Clicca sul bottone rosa **"✨ Migliora con AI"**
- L'AI analizzerà il testo e aggiungerà automaticamente:
  - **Titoli e sottotitoli** appropriati (H1, H2, H3...)
  - **Elenchi puntati/numerati** dove opportuno
  - **Enfasi** (grassetto/corsivo) per parole chiave
  - **Separazione logica** in paragrafi
  - **Formattazione codice** se presente
  - **Link** se trova URL nel testo
- Il risultato appare nell'area di output nel formato selezionato

#### 3. Note sulla sicurezza

- ✅ Le API keys sono salvate localmente nel browser (localStorage)
- ✅ Le chiavi sono criptate usando un algoritmo XOR con chiave device-specific
- ✅ Non vengono mai inviate a server esterni (solo al provider AI selezionato)
- ✅ Ogni provider salva la propria configurazione (chiave + modello) separatamente

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

| Provider | Endpoint Modelli | Come ottenere API key | Note |
|----------|------------------|----------------------|------|
| **OpenAI** | `/v1/models` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | Modelli GPT-4, GPT-3.5 e varianti |
| **DeepSeek** | `/v1/models` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) | Prezzi molto competitivi |
| **OpenRouter** | `/v1/models` | [openrouter.ai/keys](https://openrouter.ai/keys) | Accesso a 100+ modelli con pricing trasparente |
| **Google Gemini** | `/v1beta/models` | [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey) | Gemini Pro, Flash e varianti |

### Selezione Dinamica dei Modelli

L'app carica dinamicamente i modelli disponibili da ogni provider:

- **OpenAI**: gpt-4o, gpt-4o-mini, gpt-4-turbo, gpt-3.5-turbo, ecc.
- **DeepSeek**: deepseek-chat, deepseek-coder, ecc.
- **OpenRouter**: 100+ modelli da vari provider con pricing visibile (es: "$0.15/1M tokens")
- **Gemini**: gemini-1.5-pro, gemini-1.5-flash, gemini-pro, ecc.

I modelli vengono filtrati automaticamente per compatibilità (es: solo modelli che supportano chat/generateContent).

### Formato API Keys

- **OpenAI/DeepSeek/OpenRouter**: Iniziano con `sk-` (es: `sk-proj-abc123...`)
- **Gemini**: Chiave alfanumerica lunga (es: `AIzaSy...`)

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

## Sviluppo

Questo progetto è stato interamente sviluppato utilizzando **[Claude Code](https://claude.ai/code)**, l'ambiente di sviluppo AI di Anthropic che permette di creare applicazioni complete attraverso conversazioni naturali con Claude.

### Tecnologie utilizzate:
- 🤖 **Claude Sonnet 4.5** - AI pair programming
- ⚛️ **React 18 + Vite** - Framework e build tool
- 🎨 **CSS3** - Styling moderno
- 🔄 **Turndown** - Conversione HTML→Markdown
- ✏️ **React Quill** - Editor WYSIWYG
- 🔐 **Web Crypto API** - Crittografia locale

## Contribuire

Contributi, issues e feature requests sono benvenuti!

---

**Made with ❤️ using [Claude Code](https://claude.ai/code)**
