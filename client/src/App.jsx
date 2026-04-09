// import { useState } from 'react'
// import './App.css'
// import JobForm from './components/JobForm'
// import JobList from './components/JobList'

// function App() {
//   const [jobForm, setJobForm] = useState({
//     company: '',
//     title: '',
//     status: 'Applied',
//     date: '',
//     notes: ''
//   })

//   const [jobs, setJobs] = useState([])
//   const [errorMessage, setErrorMessage] = useState('')
//   const [statusFilter, setStatusFilter] = useState('All')
//   const [editingJobId, setEditingJobId] = useState(null)

//   function handleSubmit(event) {
//     event.preventDefault()

//     if (
//       jobForm.company.trim() === '' ||
//       jobForm.title.trim() === '' ||
//       jobForm.date === ''
//     ) {
//       setErrorMessage('Please fill in company name, job title, and application date.')
//       return
//     }

//     if (editingJobId !== null) {
//       const updatedJobs = jobs.map((job) =>
//         job.id === editingJobId
//           ? {
//               ...job,
//               company: jobForm.company,
//               title: jobForm.title,
//               status: jobForm.status,
//               date: jobForm.date,
//               notes: jobForm.notes
//             }
//           : job
//       )

//       setJobs(updatedJobs)
//       setEditingJobId(null)
//     } else {
//       const newJob = {
//         id: Date.now(),
//         company: jobForm.company,
//         title: jobForm.title,
//         status: jobForm.status,
//         date: jobForm.date,
//         notes: jobForm.notes
//       }

//       setJobs([...jobs, newJob])
//     }

//     setJobForm({
//       company: '',
//       title: '',
//       status: 'Applied',
//       date: '',
//       notes: ''
//     })

//     setErrorMessage('')
//   }

//   function handleDelete(jobId) {
//     const updatedJobs = jobs.filter((job) => job.id !== jobId)
//     setJobs(updatedJobs)
//   }

//   function handleEdit(job) {
//     setJobForm({
//       company: job.company,
//       title: job.title,
//       status: job.status,
//       date: job.date,
//       notes: job.notes
//     })

//     setEditingJobId(job.id)

//     const formSection = document.getElementById('job-form-section')
//     if (formSection) {
//       formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
//     }
//   }

//   const filteredJobs = jobs.filter((job) => {
//     if (statusFilter === 'All') {
//       return true
//     }

//     return job.status === statusFilter
//   })

//   const appliedCount = jobs.filter((job) => job.status === 'Applied').length
//   const interviewingCount = jobs.filter((job) => job.status === 'Interviewing').length
//   const offerCount = jobs.filter((job) => job.status === 'Offer').length

//   function handleScrollToForm() {
//     const formSection = document.getElementById('job-form-section')
//     if (formSection) {
//       formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
//     }
//   }

//   return (
//     <div className="page-shell">
//       <div className="background-orb background-orb-one"></div>
//       <div className="background-orb background-orb-two"></div>

//       <main className="app">
//         <header className="header">
//           <div className="header-badge">Job Search Dashboard</div>

//           <h1>Track your applications with clarity.</h1>
//           <p>
//             Organize opportunities, monitor progress, and keep your job search
//             feeling structured and professional.
//           </p>

//           <div className="header-stats">
//             <div className="stat-pill">
//               <span className="stat-label">Total</span>
//               <span className="stat-value">{jobs.length}</span>
//             </div>

//             <div className="stat-pill">
//               <span className="stat-label">Applied</span>
//               <span className="stat-value">{appliedCount}</span>
//             </div>

//             <div className="stat-pill">
//               <span className="stat-label">Interviewing</span>
//               <span className="stat-value">{interviewingCount}</span>
//             </div>

//             <div className="stat-pill">
//               <span className="stat-label">Offers</span>
//               <span className="stat-value">{offerCount}</span>
//             </div>
//           </div>
//         </header>

//         <section className="controls">
//           <button className="add-button" onClick={handleScrollToForm}>
//             + Add New Job
//           </button>

//           <div className="filter-box">
//             <label htmlFor="statusFilter">Filter by Status</label>
//             <select
//               id="statusFilter"
//               value={statusFilter}
//               onChange={(event) => setStatusFilter(event.target.value)}
//             >
//               <option>All</option>
//               <option>Applied</option>
//               <option>Interviewing</option>
//               <option>Rejected</option>
//               <option>Offer</option>
//             </select>
//           </div>
//         </section>

//         <div id="job-form-section">
//           <JobForm
//             jobForm={jobForm}
//             setJobForm={setJobForm}
//             onSubmit={handleSubmit}
//             errorMessage={errorMessage}
//             editingJobId={editingJobId}
//           />
//         </div>

//         <JobList
//           jobs={filteredJobs}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       </main>
//     </div>
//   )
// }

// export default App


import { useEffect, useState } from 'react'
import './App.css'
import JobForm from './components/JobForm'
import JobList from './components/JobList'

function App() {
  const [jobForm, setJobForm] = useState({
    company: '',
    title: '',
    status: 'Applied',
    date: '',
    notes: ''
  })

  const [jobs, setJobs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [editingJobId, setEditingJobId] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    try {
      const response = await fetch('http://localhost:5001/jobs')
      const data = await response.json()
      console.log('Fetched jobs:', data)
      setJobs(data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setErrorMessage('Could not load jobs from backend.')
    }
  }

  async function handleSubmit(event) {
      event.preventDefault()

      if (
        jobForm.company.trim() === '' ||
        jobForm.title.trim() === '' ||
        jobForm.date === ''
      ) {
        setErrorMessage('Please fill in company name, job title, and application date.')
        return
      }

      if (editingJobId !== null) {
    try {
      const response = await fetch(`http://localhost:5001/jobs/${editingJobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company: jobForm.company,
          title: jobForm.title,
          status: jobForm.status,
          date: jobForm.date,
          notes: jobForm.notes
        })
      })

      const updatedJob = await response.json()

      if (!response.ok) {
        throw new Error(updatedJob.error || 'Failed to update job.')
      }

      const updatedJobs = jobs.map((job) =>
        job.id === editingJobId ? updatedJob : job
      )

      setJobs(updatedJobs)
      setEditingJobId(null)

      setJobForm({
        company: '',
        title: '',
        status: 'Applied',
        date: '',
        notes: ''
      })

      setErrorMessage('')
      return
    } catch (error) {
      console.error('Error updating job:', error)
      setErrorMessage(error.message)
      return
    }
  }

    try {
      const response = await fetch('http://localhost:5001/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company: jobForm.company,
          title: jobForm.title,
          status: jobForm.status,
          date: jobForm.date,
          notes: jobForm.notes
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save job.')
      }

      setJobs([...jobs, data])

      setJobForm({
        company: '',
        title: '',
        status: 'Applied',
        date: '',
        notes: ''
      })

      setErrorMessage('')
    } catch (error) {
      console.error('Error saving job:', error)
      setErrorMessage(error.message)
    }
  }

  async function handleDelete(jobId) {
    try {
      const response = await fetch(`http://localhost:5001/jobs/${jobId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete job.')
      }

      const updatedJobs = jobs.filter((job) => job.id !== jobId)
      setJobs(updatedJobs)
    } catch (error) {
      console.error('Error deleting job:', error)
      setErrorMessage(error.message)
    }
  }

  function handleEdit(job) {
    setJobForm({
      company: job.company,
      title: job.title,
      status: job.status,
      date: job.date,
      notes: job.notes || ''
    })

    setEditingJobId(job.id)

    const formSection = document.getElementById('job-form-section')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter === 'All') {
      return true
    }

    return job.status === statusFilter
  })

  const appliedCount = jobs.filter((job) => job.status === 'Applied').length
  const interviewingCount = jobs.filter((job) => job.status === 'Interviewing').length
  const offerCount = jobs.filter((job) => job.status === 'Offer').length

  function handleScrollToForm() {
    const formSection = document.getElementById('job-form-section')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="page-shell">
      <div className="background-orb background-orb-one"></div>
      <div className="background-orb background-orb-two"></div>

      <main className="app">
        <header className="header">
          <div className="header-badge">Job Search Dashboard</div>

          <h1>Track your applications with clarity.</h1>
          <p>
            Organize opportunities, monitor progress, and keep your job search
            feeling structured and professional.
          </p>

          <div className="header-stats">
            <div className="stat-pill">
              <span className="stat-label">Total</span>
              <span className="stat-value">{jobs.length}</span>
            </div>

            <div className="stat-pill">
              <span className="stat-label">Applied</span>
              <span className="stat-value">{appliedCount}</span>
            </div>

            <div className="stat-pill">
              <span className="stat-label">Interviewing</span>
              <span className="stat-value">{interviewingCount}</span>
            </div>

            <div className="stat-pill">
              <span className="stat-label">Offers</span>
              <span className="stat-value">{offerCount}</span>
            </div>
          </div>
        </header>

        <section className="controls">
          <button className="add-button" onClick={handleScrollToForm}>
            + Add New Job
          </button>

          <div className="filter-box">
            <label htmlFor="statusFilter">Filter by Status</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All</option>
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Rejected</option>
              <option>Offer</option>
            </select>
          </div>
        </section>

        <div id="job-form-section">
          <JobForm
            jobForm={jobForm}
            setJobForm={setJobForm}
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
            editingJobId={editingJobId}
          />
        </div>

        <JobList
          jobs={filteredJobs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}

export default App