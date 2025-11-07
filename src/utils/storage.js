// Local storage utilities for persisting app data

const STORAGE_KEYS = {
  PROFILE: 'oline_profile',
  ONE_RM: 'oline_1rm',
  WORKOUT_LOGS: 'oline_workout_logs',
  KPI_TESTS: 'oline_kpi_tests',
  CURRENT_PHASE: 'oline_current_phase',
  CURRENT_WEEK: 'oline_current_week'
};

// Profile management
export const getProfile = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return data ? JSON.parse(data) : {
    name: '',
    age: '',
    bodyWeight: '',
    experience: 'advanced' // 'advanced' or 'developmental'
  };
};

export const saveProfile = (profile) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

// 1RM management
export const getOneRepMaxes = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ONE_RM);
  return data ? JSON.parse(data) : {};
};

export const saveOneRepMax = (exerciseName, weight) => {
  const allMaxes = getOneRepMaxes();
  allMaxes[exerciseName] = {
    weight: parseFloat(weight),
    date: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.ONE_RM, JSON.stringify(allMaxes));
};

// Workout logs
export const getWorkoutLogs = () => {
  const data = localStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS);
  return data ? JSON.parse(data) : [];
};

export const saveWorkoutLog = (log) => {
  const logs = getWorkoutLogs();
  logs.push({
    ...log,
    id: Date.now().toString(),
    date: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(logs));
};

export const getWorkoutLogsByDate = (date) => {
  const logs = getWorkoutLogs();
  const targetDate = new Date(date).toDateString();
  return logs.filter(log => new Date(log.date).toDateString() === targetDate);
};

// KPI tests
export const getKPITests = () => {
  const data = localStorage.getItem(STORAGE_KEYS.KPI_TESTS);
  return data ? JSON.parse(data) : [];
};

export const saveKPITest = (test) => {
  const tests = getKPITests();
  tests.push({
    ...test,
    id: Date.now().toString(),
    date: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEYS.KPI_TESTS, JSON.stringify(tests));
};

// Current phase/week
export const getCurrentPhase = () => {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_PHASE) || 'accumulation';
};

export const setCurrentPhase = (phase) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_PHASE, phase);
};

export const getCurrentWeek = () => {
  return parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_WEEK)) || 1;
};

export const setCurrentWeek = (week) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_WEEK, week.toString());
};

// Calculate working weight based on 1RM and percentage
export const calculateWorkingWeight = (oneRM, percentage) => {
  if (!oneRM || !percentage) return 0;
  return Math.round((oneRM * percentage) / 100 / 5) * 5; // Round to nearest 5
};

// Calculate 1RM from weight and reps (Epley formula)
export const calculate1RM = (weight, reps) => {
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
};

// Export all data
export const exportData = () => {
  return {
    profile: getProfile(),
    oneRepMaxes: getOneRepMaxes(),
    workoutLogs: getWorkoutLogs(),
    kpiTests: getKPITests(),
    currentPhase: getCurrentPhase(),
    currentWeek: getCurrentWeek(),
    exportDate: new Date().toISOString()
  };
};

// Import data
export const importData = (data) => {
  if (data.profile) saveProfile(data.profile);
  if (data.oneRepMaxes) localStorage.setItem(STORAGE_KEYS.ONE_RM, JSON.stringify(data.oneRepMaxes));
  if (data.workoutLogs) localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(data.workoutLogs));
  if (data.kpiTests) localStorage.setItem(STORAGE_KEYS.KPI_TESTS, JSON.stringify(data.kpiTests));
  if (data.currentPhase) setCurrentPhase(data.currentPhase);
  if (data.currentWeek) setCurrentWeek(data.currentWeek);
};

// Clear all data
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
};
