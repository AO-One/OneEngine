import React from 'react';
import ModelSelector from './ModelSelector';

export default function PromptInput({ prompt, setPrompt, selectedModel, setSelectedModel, onSubmit, loading }) {
  return (
    <section style={styles.panel}>
      <h2>Prompt Studio</h2>
      <form onSubmit={onSubmit} style={styles.form}>
        <label style={styles.label}>
          App Description:
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a quote generator micro-app for local plumbing services..."
            rows={6}
            style={styles.textarea}
          />
        </label>

        <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Generating Micro-App...' : 'Generate App'}
        </button>
      </form>
    </section>
  );
}

const styles = {
  panel: { backgroundColor: '#252526', padding: '20px', borderRadius: '8px', border: '1px solid #3c3c3c' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  label: { display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem', color: '#ccc' },
  textarea: { padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#1e1e1e', color: '#fff', resize: 'vertical' },
  button: { padding: '12px', borderRadius: '4px', border: 'none', backgroundColor: '#0e639c', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }
};