import TurndownService from 'turndown';

// Configurazione di Turndown per conversione HTML -> Markdown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
});

/**
 * Converte HTML in Markdown
 */
export const htmlToMarkdown = (html) => {
  try {
    return turndownService.turndown(html);
  } catch (error) {
    console.error('Errore nella conversione HTML -> Markdown:', error);
    return html;
  }
};

/**
 * Converte testo plain in Markdown
 * (preserva paragrafi e formattazione base)
 */
export const plainTextToMarkdown = (text) => {
  if (!text) return '';

  // Sostituisce doppi a capo con separatori di paragrafo
  const paragraphs = text.split(/\n\s*\n/);
  return paragraphs.map(p => p.trim()).join('\n\n');
};

/**
 * Converte Markdown in Markdoc
 */
export const markdownToMarkdoc = (markdown) => {
  // Markdoc è essenzialmente Markdown con estensioni
  // Per ora manteniamo il markdown base e aggiungiamo front matter se necessario
  return `---\ntitle: "Documento Convertito"\n---\n\n${markdown}`;
};

/**
 * Converte Markdown in MDX
 */
export const markdownToMDX = (markdown) => {
  // MDX supporta JSX dentro Markdown
  // Per ora creiamo un template base MDX
  return `---
title: "Documento Convertito"
---

${markdown}

{/* Questo è un file MDX. Puoi aggiungere componenti React qui */}
`;
};

/**
 * Funzione principale di conversione
 */
export const convertText = (inputText, inputType, outputFormat) => {
  let markdown = '';

  // Step 1: Converti input in Markdown
  if (inputType === 'html') {
    markdown = htmlToMarkdown(inputText);
  } else if (inputType === 'plain') {
    markdown = plainTextToMarkdown(inputText);
  } else {
    markdown = inputText; // Già markdown
  }

  // Step 2: Converti Markdown nel formato di output desiderato
  switch (outputFormat) {
    case 'markdown':
      return markdown;
    case 'markdoc':
      return markdownToMarkdoc(markdown);
    case 'mdx':
      return markdownToMDX(markdown);
    default:
      return markdown;
  }
};
