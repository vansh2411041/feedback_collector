import { useState, useEffect } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import { getAllFeedback, saveFeedback, deleteFeedback } from '../services/FeedbackService';

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load all feedback entries from the backend on mount
  useEffect(() => {
    getAllFeedback()
      .then(setFeedbackList)
      .catch(() => setError('Could not connect to the server. Make sure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  // saves new entry and prepends it to the list
  const handleSubmit = async (formData) => {
    try {
      const saved = await saveFeedback(formData);
      setFeedbackList((prev) => [saved, ...prev]);
    } catch {
      setError('Failed to submit feedback.');
    }
  };

  // deletes entry from backend then removes it from local state
  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      setFeedbackList((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError('Failed to delete feedback.');
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <h1 className="text-center text-primary mb-4 fw-bold">Feedback Collector</h1>

        {/* Show error banner if backend is unreachable */}
        {error && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError('')}
              aria-label="Close"
            />
          </div>
        )}

        <div className="row">
          {/* Left column: form */}
          <div className="col-lg-4 mb-4">
            <FeedbackForm onSubmit={handleSubmit} />
          </div>

          {/* Right column: list */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">All Feedback</h5>
              </div>
              <div className="card-body">
                {/* Show spinner while fetching initial data */}
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <FeedbackList
                    feedbackList={feedbackList}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
