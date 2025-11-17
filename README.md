# Markdown Converter

Una web app moderna per convertire testo plain (da Word, PDF, ecc.) o HTML in Markdown, Markdoc o MDX.

## Caratteristiche

- **Conversione multipla**: Supporta la conversione da testo plain e HTML verso Markdown, Markdoc e MDX
- **Editor visuale integrato**: Editor rich text tipo TinyMCE basato su React Quill per un'esperienza di editing migliorata
- **Modalità dual-view**: Scegli tra editor visuale o textarea semplice
- **Caricamento file**: Carica file .md, .markdown, .mdx o .markdoc come riferimento
- **Editing del riferimento**: Modifica direttamente i file di riferimento caricati nell'editor integrato
- **Copia e download**: Copia facilmente il risultato negli appunti o scaricalo come file
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

1. **Seleziona il tipo di input**: Scegli tra Testo Plain, HTML o Markdown
2. **Seleziona il formato di output**: Scegli tra Markdown, Markdoc o MDX
3. **Incolla o scrivi il tuo testo**: Usa l'editor visuale o la textarea semplice
4. **Carica un file di riferimento** (opzionale): Carica un file .md/.mdx/.markdoc esistente per usarlo come riferimento o template
5. **Clicca "Converti"**: Il testo convertito apparirà nella sezione di output
6. **Copia o scarica**: Usa i pulsanti per copiare il risultato o scaricarlo come file

## Formati Supportati

### Input
- **Testo Plain**: Testo copiato da Word, PDF o qualsiasi editor di testo
- **HTML**: Codice HTML con formattazione
- **Markdown**: Markdown esistente (per conversione in Markdoc/MDX)

### Output
- **Markdown**: Standard Markdown con sintassi ATX per headers
- **Markdoc**: Markdown con frontmatter YAML
- **MDX**: Markdown + JSX, con supporto per componenti React

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
│   │   └── *.css                  # Stili componenti
│   ├── utils/
│   │   └── converter.js           # Logica di conversione
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
