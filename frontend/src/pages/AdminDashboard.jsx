import { useEffect, useState } from 'react';

function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [authError, setAuthError] = useState(false);

  const load = () => {
    fetch('/api/admin/words/pending')
      .then((res) => {
        if (res.status === 401) { setAuthError(true); return []; }
        return res.json();
      })
      .then(setPending);
  };

  useEffect(load, []);

  const approve = async (id) => {
    await fetch(`/api/admin/words/${id}/approve`, { method: 'PATCH' });
    load();
  };

  const reject = async (id) => {
    await fetch(`/api/admin/words/${id}`, { method: 'DELETE' });
    load();
  };

  if (authError) return <p style={{ padding: 20 }}>Please log in first.</p>;

  return (
    <div style={{ padding: 16, maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontSize: 20 }}>Pending Words</h1>
      {pending.length === 0 && <p>Nothing pending.</p>}
      {pending.map((w) => (
        <div key={w._id} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: '#f2f2f2', borderRadius: 8, margin: '8px 0' }}>
          <span>{w.text}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => approve(w._id)}>Approve</button>
            <button onClick={() => reject(w._id)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;