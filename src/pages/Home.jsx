import { useNavigate } from 'react-router-dom';
import { workoutProgram } from '../data/workoutData';
import { getProfile } from '../utils/storage';

function Home({ currentPhase, currentWeek, onUpdate }) {
  const navigate = useNavigate();
  const profile = getProfile();
  const phase = workoutProgram.phases[currentPhase];

  return (
    <div>
      <div className="card">
        <h1 className="card-header">
          {profile.name ? `Welcome back, ${profile.name}!` : 'Welcome to O-Line Training'}
        </h1>
        <p className="card-subheader">
          High-intensity off-season training program for offensive linemen
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">Week {currentWeek}</div>
            <div className="stat-label">Current Week</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{phase.name}</div>
            <div className="stat-label">Training Phase</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{phase.weeks}</div>
            <div className="stat-label">Phase Weeks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">4</div>
            <div className="stat-label">Days/Week</div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-header">Current Phase: {phase.name}</h2>
          <p className="card-subheader">{phase.description}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="card-header">This Week's Training</h2>
        <div className="day-grid">
          {workoutProgram.dayOrder.map(day => {
            const workout = workoutProgram.workouts[day];
            return (
              <div
                key={day}
                className="day-card"
                onClick={() => navigate(`/workout/${day}`)}
              >
                <div className="day-name">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </div>
                <div className="day-description">{workout.name}</div>
                <div className="text-sm text-secondary mt-1">
                  {workout.exercises.length} exercises
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h2 className="card-header">Program Overview</h2>
        <div className="mb-3">
          <h3 className="font-bold mb-1">Why This Program Works</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li className="text-sm mb-1">
              <strong>Drive blocking = horizontal force</strong> - Heavy sled work maximizes power for moving bodies off the ball
            </li>
            <li className="text-sm mb-1">
              <strong>Pass protection = anchor & posture</strong> - Isometric training at game angles builds stiffness where you need it
            </li>
            <li className="text-sm mb-1">
              <strong>Front-loaded squatting</strong> - Keeps torso upright (OL posture) with comparable lower-body stimulus
            </li>
            <li className="text-sm mb-1">
              <strong>Strongman carries</strong> - Build trunk stiffness and base maintenance under load
            </li>
            <li className="text-sm mb-1">
              <strong>Play-specific conditioning</strong> - 5s work : 25-35s rest mirrors actual game demands
            </li>
          </ul>
        </div>

        <div className="mb-3">
          <h3 className="font-bold mb-1">Session Structure</h3>
          <ol style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li className="text-sm mb-1">Movement prep (8-10 min)</li>
            <li className="text-sm mb-1">Power work (always first)</li>
            <li className="text-sm mb-1">Primary strength lifts</li>
            <li className="text-sm mb-1">Secondary strength/accessories</li>
            <li className="text-sm mb-1">OL mechanics block</li>
            <li className="text-sm mb-1">Conditioning/finisher</li>
          </ol>
        </div>

        <div>
          <h3 className="font-bold mb-1">What We Avoid</h3>
          <p className="text-sm">
            <strong>Long, steady-state runs.</strong> They don't reflect OL demands and can mute the adaptations we're chasing.
            Plays last 3-5 seconds with 25-35s between snaps. Your engine is built with repeated high-power efforts that mirror the play clock.
          </p>
        </div>
      </div>

      {!profile.name && (
        <div className="card">
          <h2 className="card-header">Get Started</h2>
          <p className="mb-2">Set up your profile to track your progress and get personalized workout recommendations.</p>
          <button className="btn btn-primary" onClick={() => navigate('/settings')}>
            Set Up Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
