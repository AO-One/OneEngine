import React from 'react';

export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>OneEngine</h1>
      <span style={styles.badge}>Base44 Builder Engine</span>
    </header>
  );
}

const styles = {
  header: { display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '20px' },
  title: { margin: 0, fontSize: '1.8rem', color: '#61dafbaa' },
  badge: { backgroundColor: '#333', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', color: '#aaa' }
};