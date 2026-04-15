const FeedbackItem = ({ feedback, onDelete }) => {
  // Format the ISO date string to a readable format
  const formattedDate = new Date(feedback.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="card mb-3 border-start border-primary border-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="card-title fw-bold mb-0">{feedback.name}</h6>
            <small className="text-muted">{feedback.email}</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-secondary">{formattedDate}</span>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(feedback.id)}
              aria-label={`Delete feedback from ${feedback.name}`}
            >
              Delete
            </button>
          </div>
        </div>
        <p className="card-text mt-2 mb-0">{feedback.message}</p>
      </div>
    </div>
  );
};

export default FeedbackItem;
