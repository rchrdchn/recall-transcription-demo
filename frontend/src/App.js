import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [meetingUrl, setMeetingUrl] = useState('');
  const [transcripts, setTranscripts] = useState([]);
  const [status, setStatus] = useState('');

  // Handle real-time transcript updates
  useEffect(() => {
    socket.on('transcript', (transcript) => {
      setTranscripts((prev) => [...prev, transcript]);
    });
    return () => socket.off('transcript');
  }, []);

  // Deploy bot
  const handleDeployBot = async () => {
    if (!meetingUrl) {
      setStatus('Please enter a valid Google Meet URL');
      return;
    }
    setStatus('Deploying bot...');
    try {
      const response = await axios.post('http://localhost:3001/deploy-bot', {
        meeting_url: meetingUrl,
      });
      setStatus(`Bot deployed with ID: ${response.data.bot_id}`);
    } catch (error) {
      setStatus('Error deploying bot');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Recall.ai Google Meet Transcription Demo</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Google Meet URL"
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
        />
        <button onClick={handleDeployBot}>Deploy Bot</button>
      </div>
      <p>{status}</p>
      <h2>Live Transcript</h2>
      <div className="transcript-container">
        {transcripts.map((t, index) => (
          <div key={index} className="transcript">
            <span>[{t.timestamp.toFixed(2)}s] {t.speaker}: </span>
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
