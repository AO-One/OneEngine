import React from 'react';

export default function ModelSelector({ selectedModel, setSelectedModel }) {
  return (
    <div style={styles.controlGroup}>
      <label style={styles.label}>Model Route:</label>
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        style={styles.select}
      >
        <option value="fast">Fast Model (UI Layout & Boilerplate)</option>
        <option value="reasoning">Reasoning Model (Complex Logic & DB)</option>
      </select>
    </div>
  );
}

const styles = {
  controlGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '0.9rem', color: '#ccc' },
  select: { padding: '8px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#1e1e1e', color: '#fff' }
};