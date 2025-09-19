import axios from 'axios';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';

const JobContext = createContext();

export const JobProvider = ({children}) =>{
    const [jobs, setJobs] = useState([]);
    const location = useLocation()

    const fetchJobs = async () =>{
        try{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/job/jobs`,
                {withCredentials: true}
            )
            setJobs(res.data.jobs)
        } catch(err){
            console.error(err)
        }
    }

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== "/user/login" && location.pathname !== "/user/register") {
      fetchJobs();
    }
  }, [location.pathname]);

const upcomingFollowUps = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return jobs.filter((job) => {
      if (!job.followUpDate) return false;
      const date = new Date(job.followUpDate);
      return date >= today && date <= nextWeek;
    });
  }, [jobs]);


    return( 
        <JobContext.Provider value={{jobs, fetchJobs, upcomingFollowUps}}>
            {children}
        </JobContext.Provider>
    )
}

export const useJobs = () => useContext(JobContext)