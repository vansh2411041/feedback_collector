import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = 5000;

// Resolve path to the JSON data file
const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'data', 'feedback.json');

app.use(cors());
app.use(express.json());

// reads all entries from the JSON file
const readData = () => JSON.parse(readFileSync(DATA_FILE, 'utf-8'));

// writes updated entries array back to the JSON file
const writeData = (data) => writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// GET /api/feedback — return all entries
app.get('/api/feedback', (req, res) => {
  res.json(readData());
});

// POST /api/feedback — save a new entry
app.post('/api/feedback', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required.' });
  }

  const entries = readData();
  const newEntry = {
    id: Date.now().toString(),
    name,
    email,
    message,
    date: new Date().toISOString(),
  };

  entries.unshift(newEntry); // newest first
  writeData(entries);
  res.status(201).json(newEntry);
});

// DELETE /api/feedback/:id — remove an entry by id
app.delete('/api/feedback/:id', (req, res) => {
  const entries = readData();
  const filtered = entries.filter((e) => e.id !== req.params.id);

  // Return 404 if id not found
  if (filtered.length === entries.length) {
    return res.status(404).json({ error: 'Feedback not found.' });
  }

  writeData(filtered);
  res.status(200).json({ message: 'Deleted successfully.' });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
