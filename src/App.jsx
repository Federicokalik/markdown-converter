import { useState } from 'react'
import './App.css'
import MarkdownConverter from './components/MarkdownConverter'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Markdown Converter</h1>
        <p>Converti testo plain/HTML in Markdown, Markdoc o MDX</p>
      </header>
      <main>
        <MarkdownConverter />
      </main>
    </div>
  )
}

export default App
