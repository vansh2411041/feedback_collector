import { useState } from 'react';
import FeedbackItem from './FeedbackItem';
import ModalComponent from './ModalComponent';
import { filterFeedback } from '../utils/filterUtils';

const FeedbackList = ({ feedbackList, onDelete }) => {
  const [keyword, setKeyword] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Apply filters to the list
  const filtered = filterFeedback(feedbackList, keyword, dateFilter);

  // stores the id of the entry pending deletion to trigger the modal
  const handleDeleteRequest = (id) => {
    setPendingDeleteId(id);
  };

  // confirms deletion and clears the pending id
  const handleConfirmDelete = () => {
    onDelete(pendingDeleteId);
    setPendingDeleteId(null);
  };

  // cancels deletion and closes the modal
  const handleCancelDelete = () => {
    setPendingDeleteId(null);
  };

  return (
    <div>
      {/* Filter controls */}
      <div className="row g-2 mb-3">
        <div className="col-md-7">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email or message..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="Filter by keyword"
          />
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            aria-label="Filter by date"
          />
        </div>
        <div className="col-md-1">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => { setKeyword(''); setDateFilter(''); }}
            title="Clear filters"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Entry count */}
      <p className="text-muted small mb-2">
        Showing {filtered.length} of {feedbackList.length} entries
      </p>

      {/* Feedback entries */}
      {filtered.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p>No feedback found.</p>
        </div>
      ) : (
        filtered.map((item) => (
          <FeedbackItem
            key={item.id}
            feedback={item}
            onDelete={handleDeleteRequest}
          />
        ))
      )}

      {/* Delete confirmation modal */}
      <ModalComponent
        show={!!pendingDeleteId}
        title="Delete Feedback"
        message="Are you sure you want to delete this feedback? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default FeedbackList;
