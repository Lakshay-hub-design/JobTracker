import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data?.jobs) ? res.data.jobs : res.data;
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching jobs", error);
      setJobs([]); // Fail-safe
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const stats = useMemo(() => {
    const applied = jobs.filter((j) => j.status === "applied").length;
    const interview = jobs.filter((j) => j.status === "interview").length;
    const offer = jobs.filter((j) => j.status === "offer").length;
    const rejected = jobs.filter((j) => j.status === "rejected").length;
    return { total: jobs.length, applied, interview, offer, rejected };
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter ? job.jobType === typeFilter : true;
      const matchesStatus = statusFilter ? job.status === statusFilter : true;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [jobs, searchTerm, typeFilter, statusFilter]);
  
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
  
  const jobsByMonth = useMemo(() => {
     const acc = {};
     jobs.forEach(job => {
        const month = new Date(job.createdAt).toLocaleString("default", { month: "short" });
        acc[month] = (acc[month] || 0) + 1;
     });
     return acc;
  }, [jobs]);

  const barChartData = useMemo(() => Object.entries(jobsByMonth).map(([month, count]) => ({ month, count })), [jobsByMonth]);

  const pieChartData = useMemo(() => [
     { name: "Applied", value: stats.applied },
     { name: "Interview", value: stats.interview },
     { name: "Offer", value: stats.offer },
     { name: "Rejected", value: stats.rejected },
  ], [stats]);

  return {
    jobs,
    isLoading,
    stats,
    filteredJobs,
    upcomingFollowUps,
    barChartData,
    pieChartData,
    fetchJobs,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter
  };
};
