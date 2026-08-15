import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function WordList() {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/words')
            .then((res) => res.json())
            .then((data) => setWords(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p style={{ padding: 20 }}>Loading</p>;

    return (
        <div style={{ padding: 16, maxWidth: 480, margin: '0 auto' }}>
        <h1 style={{ fontSize: 22 }}>Word Counter</h1>
            {words.map((w) => (
                <Link
                    key={w._id}
                    to={`/words/${w._id}`}
                    style={{
                        display: 'block',
                        padding: '16px',
                        margin: '8px 0',
                        background: '#f2f2f2',
                        borderRadius: 8,
                        textDecoration: 'none',
                        color: '#111',
                        fontSize: 18,
                    }}
                    >
                    {w.text}
                </Link>
            ))}

            <Link to="/propose" style={{ display: 'block', marginTop: 16, fontSize: 14 }}>
                + Suggest a new word
            </Link>
            
        </div>
    );
}

export default WordList;