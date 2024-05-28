import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LeftSidebar from './components/LeftSidebar.jsx';
import RightSidebar from './components/RightSidebar.jsx';
import HomePage from './pages/HomePage.jsx';
import BrowsePage from './pages/BrowsePage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import ContentAnalysisPage from './pages/ContentAnalysisPage.jsx';

const MemberApp = () => {
  return (
    <div className="App">
      <Navbar userLevel={1} />
      <div className="main-content">
        <LeftSidebar />
        <div className="middle-section">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/content-analysis" element={<ContentAnalysisPage />} />
          </Routes>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default MemberApp;
