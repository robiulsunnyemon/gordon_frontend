import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingApp from './LandingApp';
import DashboardApp from './DashboardApp';

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardApp />} />
        <Route path="/*" element={<LandingApp />} />
      </Routes>
    </Router>
  );
}
