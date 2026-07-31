import { useState, useEffect } from 'react'
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript"

import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`)
  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  // Cooldown timer to prevent hitting rate limits
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [cooldown])

  async function reviewCode() {
    if (loading || cooldown > 0) return

    setLoading(true)
    setReview("Analyzing your code...")

    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
      // Set a 5-second cooldown between requests to respect API rate limits
      setCooldown(5)
    } catch (error) {
      console.error("Error fetching review:", error)
      
      // Handle Quota Exceeded (429) specifically
      if (error.response && error.response.status === 429) {
        setReview("⚠️ **API Quota Exceeded!** You've reached the rate limit for your API key. Please wait a minute or upgrade your API tier.")
        setCooldown(15) // Enforce a 15s wait on rate limit errors
      } else {
        setReview("❌ **Error:** Failed to fetch code review. Please check your backend connection.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-wrapper">
      {/* App Header */}
      <header className="app-header">
        <div className="header-brand">
          <span className="logo-icon">⚡</span>
          <h1>Code Analysis Engine</h1>
        </div>
        <div className="header-badge">
          <span className="status-dot"></span>
          <span>AI Active</span>
        </div>
      </header>

      {/* Main Split-Screen Workspace */}
      <main className="container">
        <div className="left">
          <div className="code-container">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={16}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 16,
                color: '#ffffff',
                backgroundColor: '#0d1117',
                height: '100%',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #30363d'
              }}
            />
          </div>
          <button 
            onClick={reviewCode} 
            disabled={loading || cooldown > 0}
            className="review-btn"
          >
            {loading 
              ? 'Reviewing...' 
              : cooldown > 0 
              ? `Wait (${cooldown}s)` 
              : 'Review'}
          </button>
        </div>

        <div className="right">
          <div className="review-container">
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review || "*Click 'Review' to generate feedback...*"}
            </Markdown>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App