import React, { useState } from 'react';

export default function AuthModal({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Authentication failed');
      
      localStorage.setItem('oneengine_user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2>{isSignup ? 'Create OneEngine Account' : 'Sign in to OneEngine'}</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            style={styles.input}
            required
          />
          {isSignup && (
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={styles.input}
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p style={styles.toggle} onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  card: { backgroundColor: '#252526', padding: '30px', borderRadius: '8px', border: '1px solid #3c3c3c', width: '360px', color: '#fff' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#1e1e1e', color: '#fff' },
  button: { padding: '10px', backgroundColor: '#0e639c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  error: { padding: '8px', backgroundColor: '#5a1d1d', color: '#ff8888', borderRadius: '4px', fontSize: '0.85rem' },
  toggle: { marginTop: '15px', fontSize: '0.85rem', color: '#61dafb', cursor: 'pointer', textAlign: 'center' }
};