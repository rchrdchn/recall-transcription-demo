require('dotenv').config();
const express = require('express');
const axios = require('axios');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

// Endpoint to deploy bot
app.post('/deploy-bot', async (req, res) => {
  const { meeting_url } = req.body;
  if (!meeting_url) {
    return res.status(400).json({ error: 'Meeting URL is required' });
  }

  try {
    const response = await axios.post(
      'https://us-east-1.recall.ai/api/v1/bot',
      {
        meeting_url,
        transcription_options: { provider: 'meeting_captions' },
      },
      {
        headers: {
          Authorization: `Token ${process.env.RECALL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json({ bot_id: response.data.id });
  } catch (error) {
    console.error('Error deploying bot:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to deploy bot' });
  }
});

// Webhook endpoint for transcription data
app.post('/webhook/transcription', (req, res) => {
  const { words, speaker, language } = req.body;
  if (words && words.length > 0) {
    const transcript = {
      speaker: speaker || 'Unknown',
      text: words.map((w) => w.text).join(' '),
      timestamp: words[0].start_time,
    };
    io.emit('transcript', transcript); // Broadcast to frontend
  }
  res.sendStatus(200);
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Frontend connected');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
