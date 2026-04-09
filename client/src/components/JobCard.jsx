function JobCard({ job, onEdit, onDelete }) {
  function getStatusClass(status) {
    if (status === 'Applied') return 'status-badge status-applied'
    if (status === 'Interviewing') return 'status-badge status-interviewing'
    if (status === 'Rejected') return 'status-badge status-rejected'
    if (status === 'Offer') return 'status-badge status-offer'
    return 'status-badge'
  }

  const notes = job.notes || ''

  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="job-card-main">
          <p className="job-card-label">Company</p>
          <h3>{job.company}</h3>
          <p className="job-card-title">{job.title}</p>
        </div>

        <div className="job-card-side">
          <span className={getStatusClass(job.status)}>{job.status}</span>
        </div>
      </div>

      <div className="job-card-details">
        <div className="job-detail-box">
          <span className="job-detail-label">Applied On</span>
          <span className="job-detail-value">{job.date}</span>
        </div>

        <div className="job-detail-box">
          <span className="job-detail-label">Position</span>
          <span className="job-detail-value">{job.title}</span>
        </div>
      </div>

      <div className="job-notes">
        <p className="job-notes-label">Notes</p>
        <p className="job-notes-text">
          {notes.trim() === '' ? 'No notes added yet.' : notes}
        </p>
      </div>

      <div className="job-card-actions">
        <button
          className="edit-button"
          onClick={() => onEdit(job)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(job.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default JobCard