import JobCard from './JobCard'

function JobList({ jobs, onEdit, onDelete }) {
  return (
    <section className="section-box saved-jobs-section">
      <div className="saved-jobs-header">
        <h2>Saved Job Applications</h2>
        <p className="section-subtext saved-jobs-subtext">
          Review your progress, manage updates, and keep each opportunity organized.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <span>+</span>
          </div>
          <p className="empty-state-title">No jobs saved yet</p>
          <p className="empty-state-text">
            Add your first application to start building your tracker.
          </p>
        </div>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default JobList