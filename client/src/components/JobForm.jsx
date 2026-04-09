function JobForm({
  jobForm,
  setJobForm,
  onSubmit,
  errorMessage,
  editingJobId
}) {
  return (
    <section className="section-box">
      <div className="section-heading-block">
        <h2>{editingJobId !== null ? 'Edit Job Application' : 'Add a Job Application'}</h2>
        <p className="section-subtext">
          Enter the details below to keep your search organized and easy to manage.
        </p>
      </div>

      <form className="job-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input
            type="text"
            id="company"
            placeholder="Enter company name"
            value={jobForm.company}
            onChange={(event) =>
              setJobForm({ ...jobForm, company: event.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter job title"
            value={jobForm.title}
            onChange={(event) =>
              setJobForm({ ...jobForm, title: event.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Application Status</label>
          <select
            id="status"
            value={jobForm.status}
            onChange={(event) =>
              setJobForm({ ...jobForm, status: event.target.value })
            }
          >
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Application Date</label>
          <input
            type="date"
            id="date"
            value={jobForm.date}
            onChange={(event) =>
              setJobForm({ ...jobForm, date: event.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            rows="4"
            placeholder="Add notes here"
            value={jobForm.notes}
            onChange={(event) =>
              setJobForm({ ...jobForm, notes: event.target.value })
            }
          ></textarea>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="submit-button">
          {editingJobId !== null ? 'Update Job' : 'Save Job'}
        </button>
      </form>
    </section>
  )
}

export default JobForm