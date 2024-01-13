const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'PUT');
  res.send();
});


app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.post('/upload', async (req, res) => {
  try {
    const response = await axios.put(
      'https://storage.sia.video.wiki/api/worker/objects/videowiki',
      req.body,
      {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Authorization': 'Basic OnBhc3N3b3Jk',
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/getvid', async (req, res) => {
  try {
    const response = await axios.get(
      'https://storage.sia.video.wiki/api/worker/objects/videowiki',
      {
        headers: {
          'Authorization': 'Basic OnBhc3N3b3Jk',
        },
      }
    );  
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
