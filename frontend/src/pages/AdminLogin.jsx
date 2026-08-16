import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) navigate('/admin');
    else setError('Invalid login');
  };

  return (
    <div style={{ padding: 16, maxWidth: 320, margin: '0 auto' }}>
      <h1 style={{ fontSize: 20 }}>Admin Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
        <input placeholder="username" value={username}
          onChange={(e) => setUsername(e.target.value)} style={{ fontSize: 16, padding: 10 }} />
        <input placeholder="password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} style={{ fontSize: 16, padding: 10 }} />
        <button type="submit" style={{ fontSize: 16, padding: 10 }}>Log in</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AdminLogin;