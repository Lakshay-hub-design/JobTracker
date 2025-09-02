import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContex';
import { useTheme } from '../../context/ThemeContext';
import { useJobs } from '../../hooks/useJobs';

// Import the new components
import Navbar from '../../components/dashboard/Navbar';
import StatsGrid from '../../features/dashboard/StatsGrid';
import JobList from '../../features/dashboard/JobList';
import ChartsContainer from '../../features/dashboard/ChartsContainer';
import AddJob from '../../features/dashboard/AddJob'; // Assuming this is your modal form component


const Dashboard = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    stats,
    filteredJobs,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    isLoading,
    upcomingFollowUps,
    pieChartData,
    barChartData,
    fetchJobs,
    ...filterProps
  } = useJobs();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar
        user={user}
        logout={logout}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        handleOpenModal={handleOpenModal}
      />
      <div className="p-4 sm:p-6  dark:text-white min-h-screen">
        <StatsGrid stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <JobList jobs={filteredJobs}
          isLoading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter} />
          <div className='pb-'>
            <ChartsContainer barChartData={barChartData} pieChartData={pieChartData} />
          </div>
        </div>

        {/* Add Job Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                onClick={handleCloseModal}
              >
                ✖
              </button>
              <AddJob onClose={handleCloseModal} onAddJob={fetchJobs} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
