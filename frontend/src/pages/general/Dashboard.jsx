import React, { useEffect, useState } from 'react'
import Navbar from '../../components/dashboard/NavBar'
import JobsList from '../../components/dashboard/JobList';
import { useJobs } from '../../context/JobContext';
import Charts from '../../components/dashboard/Charts';
import StatGrid from '../../components/dashboard/StatGrid';
import { useTheme } from '../../context/ThemeContext';
import NavBar from '../../components/dashboard/NavBar';

const Dashboard = () => {

  const {jobs} = useJobs();
  const {theme, toggleTheme} = useTheme()

  const applied = jobs.filter((job) => job.status === "applied").length;
  const interview = jobs.filter((job) => job.status === "interview").length;
  const offer = jobs.filter((job) => job.status === "offer").length;
  const rejected = jobs.filter((job) => job.status === "rejected").length;

  const pieData = [
    {name: "Applied", value: applied},
    {name: "Interview", value: interview},
    {name: "Offer", value: offer},
    {name: "Rejected", value: rejected}
  ]

  const monthlyData = {};
  jobs.forEach((job) => {
    const date = new Date(job.appliedDate);
    const month = date.toLocaleString("default", { month: "short" });
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  const barData = Object.keys(monthlyData).map((month) => ({
    month,
    applications: monthlyData[month],
  }));

  return (
    <div className="dark:bg-[#0A0A0A]">
      <NavBar theme={theme} toggleTheme={toggleTheme}/>
      <div className="p-4 sm:p-6  dark:text-white min-h-screen">  
        <StatGrid />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <JobsList jobs={jobs} />
          <Charts pieData={pieData} barData={barData}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard