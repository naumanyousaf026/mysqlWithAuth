import React, { useState, useEffect } from 'react';
import { Header } from './components/header';
import{ Sidebar } from './components/Sidebar';
import DashboardContent from './components/DashboardContent';




export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData] = useState({
    name: 'Nauman',
    email: 'nauman@example.com',
    avatar: 'N'
  });

  useEffect(() => {
    // You can fetch user data from API here
  }, []);

  const handleLogout = () => {
    window.authToken = null;
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        userData={userData} 
      />
      
      <div className="flex">
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          handleLogout={handleLogout} 
        />
        
       <DashboardContent userData={userData} />
      </div>
    </div>
  );
}
