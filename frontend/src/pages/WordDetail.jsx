import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

function WordDetail() {
    const { id } = useParams();
    const [word, setWord] = useState(null);
    const [stats, setStats] = useState([]);
    const [count, setCount] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
      fetch(`/api/words/${id}`)
        .then((res) => res.json())
        .then(setWord);
    }, [id]);

    const loadStats = () => {
        fetch(`/api/words/${id}/stats`)
            .then((res) => res.json())
            .then((data) => setStats(data.map((d) => ({ ...d, date: d.date.slice(0, 10) })))
            );
    };
    useEffect(loadStats, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/words/${id}/entries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count: Number(count) }),
        });
        if (res.ok) {
            setStatus('Saved!');
            setCount('');
            loadStats();
        } else {
            setStatus('Something went wrong');
        }
    };

    return (
    <div style={{ padding: 16, maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontSize: 20 }}>
        Today's count{word ? ` for "${word.text}"` : ''}
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          type="number"
          min="0"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          required
          style={{ flex: 1, fontSize: 18, padding: 10 }}
        />
        <button type="submit" style={{ fontSize: 18, padding: '10px 16px' }}>
          Submit
        </button>
      </form>
      {status && <p>{status}</p>}

      <h2 style={{ fontSize: 18 }}>Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="average" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WordDetail;