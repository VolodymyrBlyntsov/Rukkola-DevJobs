import React, { useState } from 'react';
import jobs from '../../data/data';
import './JobList.scss';
import { Link } from 'react-router-dom';

const JobsList = () => {

  const [jobData, setJobData] = useState(jobs);
  const [searchTerm, setSearchTerm] = useState('')

  const searchTermValue = searchTerm.toLowerCase();

  { /* Filter data by part-time, full-time, freelance and contract */}
  const filterJobData = (e) => {
      const filterValue = e.target.value;
      
      if (filterValue === 'full-time') {
        const filteredData = jobs.filter(job => job.contract === 'Full Time');
        setJobData(filteredData)
      } 
      else if (filterValue === 'part-time') {
        const filteredData = jobs.filter(job => job.contract === 'Part Time');
        setJobData(filteredData)
      }
      else if (filterValue === 'freelance') {
        const filteredData = jobs.filter(job => job.contract === 'Freelance');
        setJobData(filteredData)
      }
      else if (filterValue === 'contract') {
        const filteredData = jobs.filter(job => job.contract === 'Contract');
        setJobData(filteredData);
      }
      else {
        setJobData(jobs);
      }
    }

  return (
    <section className="job__list">
      <div className="container">
        <div className="job__list__wrapper">
          <div className="search__panel">
            <div className="search__panel-01">
              <span>
                <i className="ri-search-line"></i>
              </span>
              <input type="text" placeholder='Search by title or company' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="search__panel-02">
              <span>
                <i className="ri-map-pin-2-line"></i>
              </span>
              <input type="text" placeholder='Search by location' />
              <button className='btn'> Search </button>
            </div>
            <div className="search__panel-03">
              <select onChange={filterJobData}>
                <option> Filter job by </option>
                <option value="full-time"> Full Time </option>
                <option value="part-time"> Part Time </option>
                <option value="freelance"> Freelance </option>
                <option value="contract"> Contract </option>
              </select>
            </div>
          </div>
        </div>

        <div className="job__wrapper">
          {
            jobData?.filter(job => {
              if(searchTerm === '') return job;
              if (job.position.toLowerCase().includes(searchTermValue) || job.company.toLowerCase().includes(searchTermValue)) return job;
              }).map(item => 
              <div className="job__item" key={item.id}>
                <img src={item.logo} alt="company_logo" />
                <div className="job__content">
                  <h6> {item.postedAt} - {item.contract} </h6>
                  <h1><Link to={`/jobs/${item.position}`}>{item.position}</Link></h1>
                  <p> {item.company} </p>
                  <div className="location">
                    <p>
                      Location: <span> {item.location} </span>
                    </p>
                  </div>
                </div>
              </div>
              )
          }
        </div>

      </div>
    </section>
  )
}

export default JobsList