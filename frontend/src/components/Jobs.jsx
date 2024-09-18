import React, { useEffect, useState } from "react";
import Navbar from "./sharable/Navbar";
import Filterpage from "./Filterpage";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Jobs = () => {
  const {alljobs , searchQuery} = useSelector(store => store.job);
  const [filterJobs,setFilterJobs] = useState(alljobs);
  useEffect(()=>{
    if (searchQuery) {
      const filteredJobs = alljobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.location.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(alljobs)
    }
  },[alljobs, searchQuery])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <Filterpage />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <div >
                    <Job key={job?._id} job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
