import { useState } from 'react';
import {
  getProfile,
  saveProfile,
  getCurrentPhase,
  setCurrentPhase,
  getCurrentWeek,
  setCurrentWeek,
  exportData,
  importData,
  clearAllData
} from '../utils/storage';
import { workoutProgram } from '../data/workoutData';

function Settings({ onUpdate }) {
  const [profile, setProfile] = useState(getProfile());
  const [phase, setPhase] = useState(getCurrentPhase());
  const [week, setWeek] = useState(getCurrentWeek());

  const handleProfileSave = (e) => {
    e.preventDefault();
    saveProfile(profile);
    alert('Profile saved!');
  };

  const handlePhaseChange = (newPhase) => {
    setPhase(newPhase);
    setCurrentPhase(newPhase);
    if (onUpdate) onUpdate();
  };

  const handleWeekChange = (newWeek) => {
    setWeek(parseInt(newWeek));
    setCurrentWeek(parseInt(newWeek));
    if (onUpdate) onUpdate();
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oline-training-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        importData(data);
        alert('Data imported successfully!');
        window.location.reload();
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      clearAllData();
      alert('All data cleared!');
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="card">
        <h1 className="card-header">Settings</h1>
        <p className="card-subheader">
          Manage your profile, training phase, and data
        </p>
      </div>

      {/* Profile */}
      <div className="card">
        <h2 className="card-header">Profile</h2>
        <form onSubmit={handleProfileSave}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-input"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              placeholder="Your age"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Body Weight (lbs)</label>
            <input
              type="number"
              step="0.1"
              className="form-input"
              value={profile.bodyWeight}
              onChange={(e) => setProfile({ ...profile, bodyWeight: e.target.value })}
              placeholder="Your body weight"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Experience Level</label>
            <select
              className="form-select"
              value={profile.experience}
              onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
            >
              <option value="advanced">Advanced (17-25 years old)</option>
              <option value="developmental">Developmental (14-16 years old or newer lifter)</option>
            </select>
            <div className="text-sm text-secondary mt-1">
              {profile.experience === 'advanced'
                ? 'Full program with heavy loads and complex movements'
                : 'Modified variations with reduced intensity and simpler movements'}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Profile
          </button>
        </form>
      </div>

      {/* Training Phase */}
      <div className="card">
        <h2 className="card-header">Current Training Phase</h2>
        <p className="text-sm text-secondary mb-3">
          Select your current phase and week in the 12-week program
        </p>

        <div className="form-group">
          <label className="form-label">Phase</label>
          <div className="phase-selector">
            {Object.entries(workoutProgram.phases).map(([key, phaseData]) => (
              <button
                key={key}
                type="button"
                className={`phase-btn ${phase === key ? 'active' : ''}`}
                onClick={() => handlePhaseChange(key)}
              >
                <div className="phase-name">{phaseData.name}</div>
                <div className="phase-weeks">Weeks {phaseData.weeks}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Week (1-12)</label>
          <input
            type="number"
            min="1"
            max="12"
            className="form-input"
            value={week}
            onChange={(e) => handleWeekChange(e.target.value)}
          />
          <div className="text-sm text-secondary mt-1">
            Current: Week {week} - {workoutProgram.phases[phase].name} phase
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <h2 className="card-header">Data Management</h2>

        <div className="mb-3">
          <h3 className="font-bold mb-2">Export Data</h3>
          <p className="text-sm text-secondary mb-2">
            Download all your data (profile, 1RMs, workout logs, KPI tests) as a JSON file
          </p>
          <button className="btn btn-secondary" onClick={handleExport}>
            📥 Export All Data
          </button>
        </div>

        <div className="mb-3">
          <h3 className="font-bold mb-2">Import Data</h3>
          <p className="text-sm text-secondary mb-2">
            Restore data from a previously exported file
          </p>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
            id="import-file"
          />
          <label htmlFor="import-file" className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            📤 Import Data
          </label>
        </div>

        <div>
          <h3 className="font-bold mb-2">Clear All Data</h3>
          <p className="text-sm text-secondary mb-2">
            Permanently delete all data from this device. This cannot be undone.
          </p>
          <button className="btn btn-danger" onClick={handleClearData}>
            🗑️ Clear All Data
          </button>
        </div>
      </div>

      {/* Program Info */}
      <div className="card">
        <h2 className="card-header">About the Program</h2>
        <div className="text-sm">
          <div className="mb-3">
            <h3 className="font-bold mb-1">Training Split</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Monday: Drive Block Force (Lower max strength + horizontal force)</li>
              <li>Tuesday: Pass-Pro Power & Strike (Upper power + anchor mechanics)</li>
              <li>Thursday: Power & Base Under Load (Lower speed + carries)</li>
              <li>Friday: Upper Max + Armor & Game-Specific Energy</li>
            </ul>
          </div>

          <div className="mb-3">
            <h3 className="font-bold mb-1">Phase Progression</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Weeks 1-4 (Accumulation):</strong> High volume, build work capacity and technique</li>
              <li><strong>Weeks 5-8 (Intensification):</strong> Max strength and specific force development</li>
              <li><strong>Weeks 9-12 (Conversion):</strong> Speed of force and peak horizontal mechanics</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-1">Key Principles</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Power work always comes first</li>
              <li>Train the play clock rhythm (5s work : 25-35s rest)</li>
              <li>Build horizontal force for drive blocking</li>
              <li>Angle-specific isometrics for anchor strength</li>
              <li>No long-distance running (counter-specific for linemen)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="card">
        <h2 className="card-header">App Information</h2>
        <div className="text-sm">
          <p className="mb-2">
            <strong>O-Line Training App</strong>
          </p>
          <p className="mb-2">
            Version 1.0.0
          </p>
          <p>
            A comprehensive training tracker for the Veldheer Offensive Line program.
            All data is stored locally on your device.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
