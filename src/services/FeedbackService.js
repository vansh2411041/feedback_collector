// base URL for the feedback API
const API_URL = 'http://localhost:5000/api/feedback';

// fetches all feedback entries from the backend
export const getAllFeedback = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch feedback.');
  return res.json();
};

// sends a new feedback entry to the backend via POST
export const saveFeedback = async (feedback) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  if (!res.ok) throw new Error('Failed to save feedback.');
  return res.json();
};

// deletes a feedback entry by id via DELETE
export const deleteFeedback = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete feedback.');
};
