import { useState } from "react";
import { Link } from 'react-router-dom';

function ProposeWord() {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/words/propose', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        const data = await res.json();
        setMessage(res.ok ? data.message : data.error);
        if (res.ok) setText('');
    };

    return (
        <div style={{ padding: 16, maxWidth: 480, margin: '0 auto' }}>
            <Link to="/" style={{ fontSize: 14 }}>&larr; Back</Link>
            <h1 style={{ fontSize: 20 }}>Suggest a word</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
                <input 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    style={{ flex: 1, fontSize: 18, padding: 10 }}
                />
                <button type="submit" style={{ fontSize: 18, padding: '10px 16px' }}>
                    Suggest
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ProposeWord;
