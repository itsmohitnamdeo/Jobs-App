import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/actions';
const JobList = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs);
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    remote: false,
    onSite: false
  });

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredJobs(applyFilters(jobs, filters));
  }, [jobs, filters]);

  const applyFilters = (jobs, filters) => {
    return jobs.filter(job => {
      return (
        job.experienceRequired >= filters.minExperience &&
        job.company.toLowerCase().includes(filters.companyName.toLowerCase()) &&
        job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
        (filters.remote ? job.remote : true) &&
        (filters.onSite ? job.onSite : true)
      );
    });
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
<div className="container-fluid mt-5">
  <div className="row mb-3">
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <label htmlFor="minExperience" className="form-label">Min Experience</label>
              <input type="number" className="form-control" id="minExperience" name="minExperience" placeholder="Min Experience" value={filters.minExperience} onChange={handleFilterChange} />
            </div>
            <div className="col">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input type="text" className="form-control" id="companyName" name="companyName" placeholder="Company Name"  value={filters.companyName} onChange={handleFilterChange} />
            </div>
            <div className="col">
              <label htmlFor="location" className="form-label" >Location</label>
              <input type="text" className="form-control" id="location" name="location" placeholder="Location"  value={filters.location} onChange={handleFilterChange} />
            </div>
            <div className="col">
              <label htmlFor="techStack" className="form-label" >Tech Stack</label>
              <input type="text" className="form-control" id="techStack" name="techStack" placeholder="Tech Stack"  value={filters.techStack} onChange={handleFilterChange} />
            </div>
            <div className="col">
              <label htmlFor="role" className="form-label" >Role</label>
              <input type="text" className="form-control" id="role" name="role" placeholder="Role"  value={filters.role} onChange={handleFilterChange} />
            </div>
            <div className="col">
              <label htmlFor="minBasePay" className="form-label" >Min Base Pay</label>
              <input type="number" className="form-control" id="minBasePay" name="minBasePay" placeholder="Min Base Pay"  value={filters.minBasePay} onChange={handleFilterChange} />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <div className="checkbox">
                <input type="checkbox" className="form-check-input" id="remote" name="remote" checked={filters.remote} onChange={handleFilterChange} />
                <label className="form-check-label mx-2" htmlFor="remote">Remote</label>
                <input type="checkbox" className="form-check-input" id="onSite" name="onSite" checked={filters.onSite} onChange={handleFilterChange} />
                <label className="form-check-label mx-2" htmlFor="onSite">On-site</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      <h1 className="text-center mb-5">Job List</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            {filteredJobs.map((job, index) => (
              <div key={job.id} className="col-md-4 mb-4">
                <div className={`card border-${index % 4 + 1}`}>
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                    <p className="card-text">{job.location}</p>
                    <p className="card-text">{job.description}</p>
                    <p className="card-text">Experience Required: {job.experienceRequired}</p>
                    <p className="card-text" style={{ marginBottom: '5px' }}>Tech Stack: {job.techStack}</p>
                    <p className="card-text" style={{ marginBottom: '5px' }}>Role: {job.role}</p>
                    <p className="card-text" style={{ marginBottom: '5px' }}>Min base pay: {job.minBasePay}</p>
                    <a href={job.applyLink} className="btn" style={{ width: '100%', backgroundColor: '#08e57f', color: 'black', fontWeight: 'bold', textAlign: 'center' }}>⚡️ Easy Apply</a>
                    <a href={job.applyLink} className="btn" style={{ width: '100%', backgroundColor: '#6120ff', color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop:'5px' }}>Unlock referral asks</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;