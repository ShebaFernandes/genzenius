// import React, { useState } from 'react';
import ScriptForm from './components/ScriptForm';
import AudioPlayer from './components/AudioPlayer';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';



function App() {
  const [script, setScript] = useState('');


useEffect(() => {
  axios.get("http://127.0.0.1:8000/ping")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    });
}, []);


  return (
    <div className="App">
      <h1>🧠 AI Script + Voiceover Generator</h1>
      <ScriptForm onScriptGenerated={setScript} />
      {script && <AudioPlayer script={script} />}
    </div>
  );
}

export default App;
