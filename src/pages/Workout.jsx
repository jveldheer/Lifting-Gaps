import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workoutProgram } from '../data/workoutData';
import { getProfile, getOneRepMaxes, saveWorkoutLog, calculateWorkingWeight } from '../utils/storage';

function Workout({ currentPhase }) {
  const { day } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(day || 'monday');
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [logs, setLogs] = useState({});

  const profile = getProfile();
  const oneRepMaxes = getOneRepMaxes();
  const workout = workoutProgram.workouts[selectedDay];
  const phase = workoutProgram.phases[currentPhase];

  const handleDayChange = (newDay) => {
    setSelectedDay(newDay);
    navigate(`/workout/${newDay}`);
  };

  const toggleExerciseComplete = (exerciseId) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
    } else {
      newCompleted.add(exerciseId);
    }
    setCompletedExercises(newCompleted);
  };

  const handleLogChange = (exerciseId, field, value) => {
    setLogs({
      ...logs,
      [exerciseId]: {
        ...(logs[exerciseId] || {}),
        [field]: value
      }
    });
  };

  const saveLog = (exercise) => {
    const log = logs[exercise.id];
    if (!log || (!log.weight && !log.notes)) return;

    saveWorkoutLog({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      day: selectedDay,
      phase: currentPhase,
      ...log
    });

    alert('Workout logged!');
    setLogs({ ...logs, [exercise.id]: {} });
    toggleExerciseComplete(exercise.id);
  };

  const getWorkingWeightInfo = (exercise) => {
    if (!exercise.percentage) return null;

    const oneRM = oneRepMaxes[exercise.name]?.weight;
    if (!oneRM) return null;

    const percentage = Array.isArray(exercise.percentage) ? exercise.percentage[0] : exercise.percentage;
    const weight = calculateWorkingWeight(oneRM, percentage);

    return { oneRM, percentage, weight };
  };

  const renderExerciseDetails = (exercise) => {
    const parts = [];

    if (exercise.sets && exercise.reps) {
      if (typeof exercise.reps === 'string') {
        parts.push(`${exercise.sets} sets × ${exercise.reps}`);
      } else if (Array.isArray(exercise.reps)) {
        parts.push(`${exercise.sets} sets × ${exercise.reps[0]}-${exercise.reps[1]} reps`);
      } else {
        parts.push(`${exercise.sets}×${exercise.reps}`);
      }
    } else if (exercise.sets && exercise.duration) {
      parts.push(`${exercise.sets} sets × ${exercise.duration}`);
    } else if (exercise.sets && exercise.distance) {
      parts.push(`${exercise.sets} sets × ${exercise.distance}`);
    } else if (exercise.blocks) {
      const blockRange = Array.isArray(exercise.blocks) ? `${exercise.blocks[0]}-${exercise.blocks[1]}` : exercise.blocks;
      const repRange = Array.isArray(exercise.reps) ? `${exercise.reps[0]}-${exercise.reps[1]}` : exercise.reps;
      parts.push(`${blockRange} blocks × ${repRange} reps`);
    }

    if (exercise.percentage) {
      if (Array.isArray(exercise.percentage)) {
        parts.push(`${exercise.percentage[0]}-${exercise.percentage[1]}% 1RM`);
      } else {
        parts.push(`${exercise.percentage}% 1RM`);
      }
    }

    if (exercise.percentageBW) {
      if (Array.isArray(exercise.percentageBW)) {
        parts.push(`${exercise.percentageBW[0]}-${exercise.percentageBW[1]}% BW`);
      } else {
        parts.push(`${exercise.percentageBW}% BW`);
      }
    }

    if (exercise.rest) {
      parts.push(`Rest: ${exercise.rest}`);
    }

    if (exercise.workRest) {
      parts.push(`${exercise.workRest}`);
    }

    return parts.join(' • ');
  };

  return (
    <div>
      <div className="card">
        <h1 className="card-header">Workout</h1>
        <p className="card-subheader">
          Phase: {phase.name} • Experience: {profile.experience === 'advanced' ? 'Advanced (17-25)' : 'Developmental (14-16)'}
        </p>

        {/* Day selector */}
        <div className="day-grid mb-3">
          {workoutProgram.dayOrder.map(day => (
            <div
              key={day}
              className={`day-card ${selectedDay === day ? 'active' : ''}`}
              style={{ borderColor: selectedDay === day ? 'var(--primary)' : 'transparent' }}
              onClick={() => handleDayChange(day)}
            >
              <div className="day-name">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </div>
              <div className="day-description text-sm">
                {workoutProgram.workouts[day].name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-header">{workout.name}</h2>
        <p className="card-subheader">{workout.description}</p>

        <div className="mb-3" style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
          <div className="font-bold mb-1">Session Order:</div>
          <ol style={{ paddingLeft: '1.5rem' }} className="text-sm">
            <li>Movement prep (8-10 min)</li>
            <li>Power work (listed first below)</li>
            <li>Primary strength</li>
            <li>Accessories & mechanics</li>
            <li>Conditioning/finisher</li>
          </ol>
        </div>

        <div className="exercise-list">
          {workout.exercises.map((exercise, index) => {
            const workingWeightInfo = getWorkingWeightInfo(exercise);
            const isCompleted = completedExercises.has(exercise.id);
            const currentLog = logs[exercise.id] || {};

            return (
              <div
                key={exercise.id}
                className={`exercise-card ${isCompleted ? 'completed' : ''}`}
              >
                <div className="exercise-header">
                  <div>
                    <div className="exercise-name">
                      {index + 1}. {exercise.name}
                    </div>
                  </div>
                  <span className="exercise-category">
                    {exercise.category}
                  </span>
                </div>

                <div className="exercise-details">
                  {renderExerciseDetails(exercise)}
                </div>

                {workingWeightInfo && (
                  <div className="text-sm" style={{
                    padding: '0.5rem',
                    backgroundColor: 'var(--bg-primary)',
                    borderRadius: '0.25rem',
                    marginTop: '0.5rem'
                  }}>
                    <strong>Working Weight:</strong> {workingWeightInfo.weight} lbs
                    ({workingWeightInfo.percentage}% of {workingWeightInfo.oneRM} lbs 1RM)
                  </div>
                )}

                {!workingWeightInfo && exercise.percentage && (
                  <div className="text-sm text-secondary" style={{ marginTop: '0.5rem' }}>
                    💡 Set your 1RM for {exercise.name} in the calculator to see working weights
                  </div>
                )}

                {exercise.notes && (
                  <div className="exercise-notes">{exercise.notes}</div>
                )}

                {profile.experience === 'developmental' && exercise.developmental && (
                  <div className="text-sm" style={{
                    padding: '0.5rem',
                    backgroundColor: 'var(--warning)',
                    color: 'white',
                    borderRadius: '0.25rem',
                    marginTop: '0.5rem'
                  }}>
                    <strong>Developmental variation:</strong> {exercise.developmental}
                  </div>
                )}

                {exercise.alternative && (
                  <div className="text-sm text-secondary" style={{ marginTop: '0.5rem' }}>
                    <strong>Alternative:</strong> {exercise.alternative}
                  </div>
                )}

                {/* Log form */}
                <div className="log-form">
                  <div className="log-input">
                    <input
                      type="number"
                      placeholder="Weight (lbs)"
                      className="form-input"
                      value={currentLog.weight || ''}
                      onChange={(e) => handleLogChange(exercise.id, 'weight', e.target.value)}
                    />
                  </div>
                  <div className="log-input">
                    <input
                      type="text"
                      placeholder="Notes (optional)"
                      className="form-input"
                      value={currentLog.notes || ''}
                      onChange={(e) => handleLogChange(exercise.id, 'notes', e.target.value)}
                    />
                  </div>
                  <button
                    className={`btn ${isCompleted ? 'btn-secondary' : 'btn-success'}`}
                    onClick={() => isCompleted ? toggleExerciseComplete(exercise.id) : saveLog(exercise)}
                  >
                    {isCompleted ? '✓ Done' : 'Log'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 text-center">
          <div className="text-sm text-secondary mb-2">
            Completed {completedExercises.size} of {workout.exercises.length} exercises
          </div>
          {completedExercises.size === workout.exercises.length && (
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--secondary)',
              color: 'white',
              borderRadius: '0.5rem',
              fontWeight: 'bold'
            }}>
              🎉 Workout Complete! Hit the Daily Vault work inside the Veldheer lineman Vault.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workout;
