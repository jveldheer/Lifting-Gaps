import { useState } from 'react';
import { getWorkoutLogs, getKPITests, saveKPITest } from '../utils/storage';
import { workoutProgram } from '../data/workoutData';

function Progress() {
  const [showKPIForm, setShowKPIForm] = useState(false);
  const [kpiForm, setKpiForm] = useState({ id: '', value: '' });

  const workoutLogs = getWorkoutLogs();
  const kpiTests = getKPITests();

  const handleKPISubmit = (e) => {
    e.preventDefault();
    if (kpiForm.id && kpiForm.value) {
      saveKPITest({
        kpiId: kpiForm.id,
        value: parseFloat(kpiForm.value)
      });
      setKpiForm({ id: '', value: '' });
      setShowKPIForm(false);
      window.location.reload();
    }
  };

  // Group logs by exercise
  const logsByExercise = workoutLogs.reduce((acc, log) => {
    if (!acc[log.exerciseName]) {
      acc[log.exerciseName] = [];
    }
    acc[log.exerciseName].push(log);
    return acc;
  }, {});

  // Group KPIs by type
  const kpisByType = kpiTests.reduce((acc, test) => {
    if (!acc[test.kpiId]) {
      acc[test.kpiId] = [];
    }
    acc[test.kpiId].push(test);
    return acc;
  }, {});

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLatestKPI = (kpiId) => {
    const tests = kpisByType[kpiId];
    if (!tests || tests.length === 0) return null;
    return tests.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  };

  const getKPIImprovement = (kpiId) => {
    const tests = kpisByType[kpiId];
    if (!tests || tests.length < 2) return null;

    const sorted = tests.sort((a, b) => new Date(a.date) - new Date(b.date));
    const first = sorted[0].value;
    const latest = sorted[sorted.length - 1].value;

    const kpi = workoutProgram.kpis.find(k => k.id === kpiId);
    const improvement = kpi.lowerIsBetter ? first - latest : latest - first;
    const percentChange = ((improvement / first) * 100).toFixed(1);

    return { improvement, percentChange, isPositive: improvement > 0 };
  };

  return (
    <div>
      <div className="card">
        <h1 className="card-header">Progress Tracking</h1>
        <p className="card-subheader">
          Track your KPIs monthly and review your workout history
        </p>
      </div>

      {/* KPI Section */}
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <h2 className="card-header" style={{ marginBottom: 0 }}>Key Performance Indicators</h2>
          <button
            className="btn btn-primary btn-small"
            onClick={() => setShowKPIForm(!showKPIForm)}
          >
            {showKPIForm ? 'Cancel' : '+ Add Test'}
          </button>
        </div>

        {showKPIForm && (
          <form onSubmit={handleKPISubmit} className="mb-3" style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.5rem'
          }}>
            <div className="form-group">
              <label className="form-label">KPI Test</label>
              <select
                className="form-select"
                value={kpiForm.id}
                onChange={(e) => setKpiForm({ ...kpiForm, id: e.target.value })}
                required
              >
                <option value="">Select a test...</option>
                {workoutProgram.kpis.map(kpi => (
                  <option key={kpi.id} value={kpi.id}>
                    {kpi.name} ({kpi.unit})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Result</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={kpiForm.value}
                onChange={(e) => setKpiForm({ ...kpiForm, value: e.target.value })}
                placeholder="Enter your result"
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Save Test Result
            </button>
          </form>
        )}

        <div className="stats-grid">
          {workoutProgram.kpis.map(kpi => {
            const latest = getLatestKPI(kpi.id);
            const improvement = getKPIImprovement(kpi.id);

            return (
              <div key={kpi.id} className="stat-card">
                <div className="stat-label">{kpi.name}</div>
                {latest ? (
                  <>
                    <div className="stat-value">
                      {latest.value} <span className="text-sm">{kpi.unit}</span>
                    </div>
                    <div className="text-xs text-secondary">
                      {formatDate(latest.date)}
                    </div>
                    {improvement && (
                      <div className="text-xs mt-1" style={{
                        color: improvement.isPositive ? 'var(--secondary)' : 'var(--danger)'
                      }}>
                        {improvement.isPositive ? '↑' : '↓'} {Math.abs(improvement.improvement).toFixed(2)} {kpi.unit}
                        ({improvement.isPositive ? '+' : ''}{improvement.percentChange}%)
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-sm text-secondary">No tests yet</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-3 text-sm text-secondary">
          💡 Track these KPIs monthly to measure your progress across the 12-week program
        </div>
      </div>

      {/* Workout History */}
      <div className="card">
        <h2 className="card-header">Recent Workout Logs</h2>

        {workoutLogs.length === 0 ? (
          <div className="text-center text-secondary" style={{ padding: '2rem' }}>
            <div className="mb-2">No workouts logged yet</div>
            <div className="text-sm">Start logging your workouts to track your progress!</div>
          </div>
        ) : (
          <div>
            <div className="mb-3 text-sm text-secondary">
              Total workouts logged: {workoutLogs.length}
            </div>

            {Object.entries(logsByExercise)
              .sort(([, a], [, b]) => b.length - a.length)
              .map(([exerciseName, logs]) => (
                <div key={exerciseName} className="mb-3" style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem'
                }}>
                  <div className="font-bold mb-2">{exerciseName}</div>
                  <div className="text-sm text-secondary mb-2">
                    {logs.length} sessions logged
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {logs
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 5)
                      .map((log, idx) => (
                        <div key={idx} className="text-sm" style={{
                          padding: '0.5rem',
                          backgroundColor: 'var(--bg-primary)',
                          borderRadius: '0.25rem'
                        }}>
                          <div className="flex justify-between items-center">
                            <span>
                              {log.weight && <><strong>{log.weight} lbs</strong></>}
                              {log.notes && <span className="text-secondary"> • {log.notes}</span>}
                            </span>
                            <span className="text-xs text-secondary">
                              {formatDate(log.date)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>

                  {logs.length > 5 && (
                    <div className="text-xs text-secondary mt-2">
                      ... and {logs.length - 5} more sessions
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* KPI History Details */}
      {Object.keys(kpisByType).length > 0 && (
        <div className="card">
          <h2 className="card-header">KPI Test History</h2>

          {workoutProgram.kpis.map(kpi => {
            const tests = kpisByType[kpi.id];
            if (!tests || tests.length === 0) return null;

            return (
              <div key={kpi.id} className="mb-3" style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem'
              }}>
                <div className="font-bold mb-2">{kpi.name}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {tests
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((test, idx) => (
                      <div key={idx} className="text-sm" style={{
                        padding: '0.5rem',
                        backgroundColor: 'var(--bg-primary)',
                        borderRadius: '0.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span>
                          <strong>{test.value} {kpi.unit}</strong>
                        </span>
                        <span className="text-xs text-secondary">
                          {formatDate(test.date)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Progress;
