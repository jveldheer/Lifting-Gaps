import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/App.css';
import Home from './pages/Home';
import Workout from './pages/Workout';
import Progress from './pages/Progress';
import OneRMCalculator from './pages/OneRMCalculator';
import Settings from './pages/Settings';
import { getCurrentPhase, getCurrentWeek } from './utils/storage';

function App() {
  const [currentPhase, setCurrentPhase] = useState(getCurrentPhase());
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

  const updatePhaseAndWeek = () => {
    setCurrentPhase(getCurrentPhase());
    setCurrentWeek(getCurrentWeek());
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <div className="logo">O-Line Training</div>
            <nav className="nav">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
              <NavLink to="/workout" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Workout
              </NavLink>
              <NavLink to="/progress" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Progress
              </NavLink>
              <NavLink to="/calculator" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                1RM Calc
              </NavLink>
              <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Settings
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home currentPhase={currentPhase} currentWeek={currentWeek} onUpdate={updatePhaseAndWeek} />} />
            <Route path="/workout" element={<Workout currentPhase={currentPhase} />} />
            <Route path="/workout/:day" element={<Workout currentPhase={currentPhase} />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/calculator" element={<OneRMCalculator />} />
            <Route path="/settings" element={<Settings onUpdate={updatePhaseAndWeek} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
