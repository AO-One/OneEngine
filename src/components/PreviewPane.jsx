import React from 'react';

export default function PreviewPane({ loading, generatedApp }) {
  return (
    <section style={styles.panel}>
      <h2>Generated Output / Preview</h2>
      <div style={styles.previewBox}>
        {loading && <p>Routing prompt through database_gate.py...</p>}
        {!loading && !generatedApp && (
          <p style={styles.placeholder}>Enter a prompt on the left to start building your AI micro-app.</p>
        )}
        {!loading && generatedApp && (
          <pre style={styles.codeOutput}>
            <code>{typeof generatedApp === 'object' ? JSON.stringify(generatedApp, null, 2) : generatedApp}</code>
          </pre>
        )}
      </div>
    </section>
  );
}

const styles = {
  panel: { backgroundColor: '#252526', padding: '20px', borderRadius: '8px', border: '1px solid #3c3c3c' },
  previewBox: { minHeight: '300px', backgroundColor: '#1e1e1e', padding: '15px', borderRadius: '4px', border: '1px solid #444', overflowX: 'auto' },
  placeholder: { color: '#777', fontStyle: 'italic' },
  codeOutput: { margin: 0, color: '#9cdcfe', fontSize: '0.85rem' }
};