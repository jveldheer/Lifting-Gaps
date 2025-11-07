import { useState } from 'react';
import { getOneRepMaxes, saveOneRepMax, calculate1RM } from '../utils/storage';
import { workoutProgram } from '../data/workoutData';

function OneRMCalculator() {
  const [calcForm, setCalcForm] = useState({ weight: '', reps: '' });
  const [calculated1RM, setCalculated1RM] = useState(null);
  const [manualForm, setManualForm] = useState({ exercise: '', weight: '' });

  const oneRepMaxes = getOneRepMaxes();

  const handleCalculate = (e) => {
    e.preventDefault();
    const weight = parseFloat(calcForm.weight);
    const reps = parseInt(calcForm.reps);

    if (weight && reps) {
      const oneRM = calculate1RM(weight, reps);
      setCalculated1RM(oneRM);
    }
  };

  const handleManualSave = (e) => {
    e.preventDefault();
    if (manualForm.exercise && manualForm.weight) {
      saveOneRepMax(manualForm.exercise, parseFloat(manualForm.weight));
      setManualForm({ exercise: '', weight: '' });
      alert('1RM saved!');
      window.location.reload();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      <div className="card">
        <h1 className="card-header">1RM Calculator</h1>
        <p className="card-subheader">
          Calculate and track your one-rep max for accurate working weight percentages
        </p>
      </div>

      {/* Calculator */}
      <div className="card">
        <h2 className="card-header">Calculate 1RM</h2>
        <p className="text-sm text-secondary mb-3">
          Use the Epley formula to estimate your 1RM from a recent lift
        </p>

        <form onSubmit={handleCalculate}>
          <div className="form-group">
            <label className="form-label">Weight Lifted (lbs)</label>
            <input
              type="number"
              step="0.1"
              className="form-input"
              value={calcForm.weight}
              onChange={(e) => setCalcForm({ ...calcForm, weight: e.target.value })}
              placeholder="Enter weight"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Reps Completed</label>
            <input
              type="number"
              className="form-input"
              value={calcForm.reps}
              onChange={(e) => setCalcForm({ ...calcForm, reps: e.target.value })}
              placeholder="Enter reps"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Calculate 1RM
          </button>
        </form>

        {calculated1RM && (
          <div className="mt-3" style={{
            padding: '1.5rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div className="text-sm text-secondary mb-1">Estimated 1RM</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              {calculated1RM} lbs
            </div>
            <div className="text-sm text-secondary mt-2">
              Based on {calcForm.weight} lbs × {calcForm.reps} reps (Epley formula)
            </div>
          </div>
        )}
      </div>

      {/* Manual Entry */}
      <div className="card">
        <h2 className="card-header">Save 1RM</h2>
        <p className="text-sm text-secondary mb-3">
          Save your 1RM to automatically calculate working weights during workouts
        </p>

        <form onSubmit={handleManualSave}>
          <div className="form-group">
            <label className="form-label">Exercise</label>
            <select
              className="form-select"
              value={manualForm.exercise}
              onChange={(e) => setManualForm({ ...manualForm, exercise: e.target.value })}
              required
            >
              <option value="">Select exercise...</option>
              {workoutProgram.oneRepMaxExercises.map(exercise => (
                <option key={exercise} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">1RM (lbs)</label>
            <input
              type="number"
              step="0.1"
              className="form-input"
              value={manualForm.weight}
              onChange={(e) => setManualForm({ ...manualForm, weight: e.target.value })}
              placeholder="Enter your 1RM"
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            Save 1RM
          </button>
        </form>
      </div>

      {/* Saved 1RMs */}
      <div className="card">
        <h2 className="card-header">Your Saved 1RMs</h2>

        {Object.keys(oneRepMaxes).length === 0 ? (
          <div className="text-center text-secondary" style={{ padding: '2rem' }}>
            <div className="mb-2">No 1RMs saved yet</div>
            <div className="text-sm">Save your 1RMs to see working weights in your workouts</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {Object.entries(oneRepMaxes)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([exercise, data]) => (
                <div key={exercise} className="stat-card">
                  <div className="stat-label">{exercise}</div>
                  <div className="stat-value">{data.weight} <span className="text-sm">lbs</span></div>
                  <div className="text-xs text-secondary mt-1">
                    {formatDate(data.date)}
                  </div>

                  {/* Working weight examples */}
                  <div className="mt-2 text-xs" style={{
                    padding: '0.5rem',
                    backgroundColor: 'var(--bg-primary)',
                    borderRadius: '0.25rem'
                  }}>
                    <div className="font-bold mb-1">Working Weights:</div>
                    <div>70%: {Math.round(data.weight * 0.7 / 5) * 5} lbs</div>
                    <div>80%: {Math.round(data.weight * 0.8 / 5) * 5} lbs</div>
                    <div>85%: {Math.round(data.weight * 0.85 / 5) * 5} lbs</div>
                    <div>90%: {Math.round(data.weight * 0.9 / 5) * 5} lbs</div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="card">
        <h2 className="card-header">About 1RM</h2>
        <div className="text-sm">
          <p className="mb-2">
            <strong>One-rep max (1RM)</strong> is the maximum weight you can lift for a single repetition with proper form.
          </p>
          <p className="mb-2">
            <strong>Why track it?</strong> The program prescribes working weights as percentages of your 1RM (e.g., 75-85%).
            Tracking your 1RM ensures you're lifting the right loads for each phase.
          </p>
          <p className="mb-2">
            <strong>Epley Formula:</strong> 1RM = Weight × (1 + Reps/30)
          </p>
          <p>
            <strong>Tip:</strong> Test your 1RM at the start of each phase (every 4 weeks) or use the calculator
            with recent heavy sets (3-5 reps work best).
          </p>
        </div>
      </div>
    </div>
  );
}

export default OneRMCalculator;
