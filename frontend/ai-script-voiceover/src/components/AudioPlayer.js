import React, { useState } from 'react';

const AudioPlayer = ({ script }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // const handleGenerateAudio = async () => {
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append('text', script);

  //   const response = await fetch('http://127.0.0.1:8000/generate-audio', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   const blob = await response.blob();
  //   const url = URL.createObjectURL(blob);
  //   setAudioUrl(url);
  //   setLoading(false);
  // };

  const handleGenerateAudio = async () => {
    console.log('Generating audio for script:', script);
    setLoading(true);
  
    const response = await fetch('http://127.0.0.1:8000/generate-audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic: script }),
    });
    console.log('Response:', response);
  
    const data = await response.json();
    console.log('data :',data)
    setAudioUrl(data.audio_url);  // assuming audio_url is returned
    setLoading(false);
  };
  
  console.log("Audio URL:", audioUrl);


  return (
    <div className="audio-section">
      <h3>Generated Script:</h3>
      <p>{script}</p>

      <button onClick={handleGenerateAudio} disabled={loading}>
        {loading ? 'Converting...' : 'Generatee Voiceover'}
      </button>

      {audioUrl && (
       
        <audio controls src={audioUrl}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;
