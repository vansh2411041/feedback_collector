# Feedback Collector

A simple full-stack app to collect, view, filter, and delete user feedback.

Built with **React + Vite** (frontend) and **Node.js + Express** (backend). Data is stored in a local JSON file.

---

## Features

- Submit feedback with name, email, and message
- View all submitted feedback entries
- Filter by keyword or date
- Delete entries with a confirmation prompt

---

## Project Structure

```
feedback_collector/
├── backend/
│   ├── data/feedback.json   # persisted feedback data
│   └── server.js            # Express REST API
├── src/
│   ├── components/          # FeedbackForm, FeedbackList, FeedbackItem, ModalComponent
│   ├── pages/               # FeedbackPage
│   ├── services/            # API calls (FeedbackService.js)
│   └── utils/               # Filter logic (filterUtils.js)
└── index.html
```

---

## Getting Started

### 1. Install dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 2. Run the app

Open two terminals:

```bash
# Terminal 1 — backend (runs on http://localhost:5000)
cd backend
npm run dev

# Terminal 2 — frontend (runs on http://localhost:5173)
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/feedback` | Get all feedback entries |
| POST | `/api/feedback` | Submit a new entry |
| DELETE | `/api/feedback/:id` | Delete an entry by id |

---

## Tech Stack

- React 19
- Vite
- Bootstrap 5
- Node.js + Express
- JSON file storage
