/**
 * ModalComponent
 * A reusable Bootstrap confirmation modal.
 *
 * @param {boolean} show - Whether the modal is visible
 * @param {string} title - Modal title text
 * @param {string} message - Modal body message
 * @param {Function} onConfirm - Called when user confirms
 * @param {Function} onCancel - Called when user cancels
 */
const ModalComponent = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancel}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
