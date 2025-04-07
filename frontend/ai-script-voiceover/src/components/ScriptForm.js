import React, { useState } from 'react';

const ScriptForm = ({ onScriptGenerated }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const response = await fetch('http://127.0.0.1:8000/generate-script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();
    onScriptGenerated(data.script);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic..."
        required
      />
      <button type="submit">{loading ? 'Generating...' : 'Generate Script'}</button>
    </form>
  );
};

export default ScriptForm;
