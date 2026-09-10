import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [prompt, setPrompt] = useState('');
  const [modelType, setModelType] = useState('fast');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model_type: modelType })
      });
      const data = await response.json();
      setGeneratedCode(data.code || 'No code returned.');
    } catch (err) {
      setGeneratedCode(`// Error connecting to database_gate: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Universal Hub Navigation Header */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <span style={styles.logo}>OneEngine</span>
          <span style={styles.tag}>Central Hub</span>
        </div>
        <nav style={styles.nav}>
          <button 
            style={activeTab === 'itguru' ? styles.activeNavBtn : styles.navBtn} 
            onClick={() => setActiveTab('itguru')}
          >
            ITGuru
          </button>
          <button 
            style={activeTab === 'adpagespace' ? styles.activeNavBtn : styles.navBtn} 
            onClick={() => setActiveTab('adpagespace')}
          >
            Adpagespace
          </button>
          <button 
            style={activeTab === 'webdev' ? styles.activeNavBtn : styles.navBtn} 
            onClick={() => setActiveTab('webdev')}
          >
            Web Developer
          </button>
          <button 
            style={activeTab === 'codecentral' ? styles.activeNavBtn : styles.navBtn} 
            onClick={() => setActiveTab('codecentral')}
          >
            CodeCentral
          </button>
          <button 
            style={activeTab === 'studio' ? styles.activeNavBtn : styles.navBtn} 
            onClick={() => setActiveTab('studio')}
          >
            AI App Studio
          </button>
        </nav>
      </header>

      {/* Main Workspace Content Area */}
      <main style={styles.content}>
        {activeTab === 'itguru' && (
          <iframe 
            src="https://yourusername.github.io/ITGuru" 
            title="ITGuru Portal"
            style={styles.iframeView}
          />
        )}

        {activeTab === 'adpagespace' && (
          <iframe 
            src="https://yourusername.github.io/Adpagespace" 
            title="Adpagespace Portal"
            style={styles.iframeView}
          />
        )}

        {activeTab === 'webdev' && (
          <iframe 
            src="https://yourusername.github.io/WebDeveloper" 
            title="Web Developer Portal"
            style={styles.iframeView}
          />
        )}

        {activeTab === 'codecentral' && (
          <iframe 
            src="https://yourusername.github.io/CodeCentral" 
            title="CodeCentral Portal"
            style={styles.iframeView}
          />
        )}

        {activeTab === 'studio' && (
          <div style={styles.studioGrid}>
            <div style={styles.panel}>
              <h3 style={styles.panelTitle}>Prompt Studio</h3>
              <textarea
                style={styles.textarea}
                placeholder="Describe your micro-app (e.g., Create an interactive quote calculator for local IT services)..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div style={styles.controls}>
                <select 
                  style={styles.select} 
                  value={modelType} 
                  onChange={(e) => setModelType(e.target.value)}
                >
                  <option value="fast">Fast Model (llama3.2:1b)</option>
                  <option value="reasoning">Reasoning Model (llama3.2:3b)</option>
                </select>
                <button 
                  style={styles.generateBtn} 
                  onClick={handleGenerate} 
                  disabled={loading}
                >
                  {loading ? 'Generating Code...' : 'Generate Micro-App'}
                </button>
              </div>
            </div>

            <div style={styles.panel}>
              <h3 style={styles.panelTitle}>Generated Output / Preview</h3>
              <pre style={styles.codeOutput}>
                {generatedCode || '// Generated micro-app code from Ollama will appear here...'}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#181818', color: '#fff', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', backgroundColor: '#212121', borderBottom: '1px solid #333' },
  brand: { display: 'flex', alignItems: 'center', gap: '10px' },
  logo: { fontSize: '1.25rem', fontWeight: 'bold', color: '#61dafb', letterSpacing: '-0.5px' },
  tag: { fontSize: '0.75rem', backgroundColor: '#333', padding: '2px 8px', borderRadius: '4px', color: '#aaa', textTransform: 'uppercase' },
  nav: { display: 'flex', gap: '8px' },
  navBtn: { padding: '8px 16px', backgroundColor: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', borderRadius: '4px', fontSize: '0.9rem', transition: 'all 0.2s' },
  activeNavBtn: { padding: '8px 16px', backgroundColor: '#0e639c', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' },
  content: { flex: 1, padding: '0px' },
  iframeView: { width: '100%', height: 'calc(100vh - 65px)', border: 'none', backgroundColor: '#fff' },
  studioGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: 'calc(100vh - 110px)', padding: '24px' },
  panel: { backgroundColor: '#252526', padding: '20px', borderRadius: '8px', border: '1px solid #3c3c3c', display: 'flex', flexDirection: 'column', gap: '12px' },
  panelTitle: { fontSize: '1rem', color: '#ccc' },
  textarea: { flex: 1, backgroundColor: '#1e1e1e', border: '1px solid #3c3c3c', color: '#fff', padding: '12px', borderRadius: '4px', resize: 'none', fontFamily: 'inherit', fontSize: '0.95rem' },
  controls: { display: 'flex', gap: '12px' },
  select: { padding: '10px', backgroundColor: '#1e1e1e', color: '#fff', border: '1px solid #3c3c3c', borderRadius: '4px', outline: 'none' },
  generateBtn: { flex: 1, backgroundColor: '#0e639c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem' },
  codeOutput: { flex: 1, backgroundColor: '#1e1e1e', padding: '16px', borderRadius: '4px', overflow: 'auto', border: '1px solid #3c3c3c', color: '#a6e22e', fontFamily: 'Consolas, Monaco, monospace', fontSize: '0.85rem', lineHeight: '1.4' }
};