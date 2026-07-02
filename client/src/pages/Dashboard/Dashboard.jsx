import "./Dashboard.css";

import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import Welcome from "../../components/dashboard/Welcome";
import StatsCards from "../../components/dashboard/StatsCards";
import AIWidget from "../../components/dashboard/AIWidget";
import RecentProjects from "../../components/dashboard/RecentProjects";
import CalendarWidget from "../../components/dashboard/CalendarWidget";
import Activity from "../../components/dashboard/Activity";
import { useState } from "react";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="dashboard">

      <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

      <div className="dashboard-content">

        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="dashboard-main">

          <Welcome />

          <StatsCards />

          <div className="dashboard-grid">

            <div className="left-column">
              <AIWidget />
              <RecentProjects />
            </div>

            <div className="right-column">
              <CalendarWidget />
              <Activity />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;