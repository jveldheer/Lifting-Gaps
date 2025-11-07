export const workoutProgram = {
  phases: {
    accumulation: {
      name: "Accumulation",
      weeks: "1-4",
      description: "High volume, build work capacity/technique",
      loading: {
        mainStrength: { percentage: [70, 80], sets: 5, reps: [5, 6] },
        power: { percentage: [70, 80], sets: 5, reps: 3 },
        sledPush: { percentageBW: [60, 80], sets: [8, 10], distance: "10-15m" },
        carries: { description: "moderate-heavy, total 100-150m" }
      }
    },
    intensification: {
      name: "Intensification",
      weeks: "5-8",
      description: "Max strength & specific force",
      loading: {
        mainStrength: { percentage: [82, 90], sets: [4, 5], reps: [3, 4] },
        power: { percentage: [75, 85], sets: 5, reps: [2, 3] },
        sledPush: { percentageBW: [80, 100], sets: [8, 10], distance: "10m" },
        isometricAnchors: { sets: 4, duration: "10-12s" },
        carries: { description: "heavier, 100-140m" }
      }
    },
    conversion: {
      name: "Power/Conversion",
      weeks: "9-12",
      description: "Speed of force & peak horizontal mechanics",
      loading: {
        mainStrength: { percentage: [80, 85], sets: [3, 4], reps: 3 },
        power: { percentage: [70, 80], sets: 6, reps: [2, 3] },
        trapBarJumps: { percentage: [20, 40] },
        sledPush: { percentageBW: [70, 96], sets: [6, 8], distance: "10m" },
        conditioning: { blocks: 3, reps: [10, 12], workRest: "5s:25-35s" }
      }
    }
  },

  workouts: {
    monday: {
      name: "DRIVE BLOCK FORCE",
      description: "Lower-body max strength + horizontal force",
      exercises: [
        {
          id: "mon-1",
          name: "Power Clean from Blocks",
          sets: 5,
          reps: 3,
          percentage: [70, 85],
          rest: "full recovery",
          notes: "Full recovery between sets",
          category: "power",
          developmental: "Clean Pull 5×3 @ 80-90% of clean-pull 1RM"
        },
        {
          id: "mon-2",
          name: "Front Squat",
          sets: 5,
          reps: 5,
          percentage: [75, 85],
          rest: "2-4 min",
          notes: "High-bar back squat acceptable",
          category: "strength",
          developmental: "4×5 @ 70-80%"
        },
        {
          id: "mon-3",
          name: "Very-Heavy Sled Push",
          sets: [8, 10],
          distance: "10-15m",
          percentageBW: [70, 90],
          rest: "2-3 min",
          notes: "Push hard, full recovery",
          category: "horizontal-force",
          developmental: "6-8×10m @ 50-70% BW"
        },
        {
          id: "mon-4",
          name: "Barbell Hip Thrust",
          sets: 4,
          reps: 6,
          percentage: 80,
          rest: "60-90s",
          category: "accessory"
        },
        {
          id: "mon-5",
          name: "Nordic Hamstring",
          sets: 4,
          reps: 6,
          rest: "60-90s",
          notes: "Controlled eccentric",
          category: "accessory"
        },
        {
          id: "mon-6",
          name: "Ankle/Calf Isometrics",
          sets: 3,
          duration: "30-45s",
          rest: "60s",
          notes: "Heavy hold (sled handles or pins)",
          category: "accessory"
        },
        {
          id: "mon-7",
          name: "First-Step Accelerations",
          sets: 6,
          distance: "5m",
          rest: "full",
          notes: "Focus: shin angle, hips through",
          category: "mechanics"
        }
      ]
    },

    tuesday: {
      name: "PASS-PRO POWER & STRIKE",
      description: "Upper-body power + anchor mechanics",
      exercises: [
        {
          id: "tue-1",
          name: "Bench Press (Cluster)",
          sets: 6,
          reps: "2+2+2",
          percentage: [82, 87],
          rest: "20-30s intra / 3min between",
          notes: "Cluster sets: 2 reps, rest 20-30s, repeat 3 times = 1 cluster",
          category: "power",
          developmental: "Flat bench 5×5 @ 75-82%"
        },
        {
          id: "tue-2",
          name: "Push Press",
          sets: 5,
          reps: 3,
          percentage: [70, 80],
          rest: "2-3 min",
          notes: "Bar speed emphasis",
          category: "power"
        },
        {
          id: "tue-3",
          name: "Med-Ball Chest Punches",
          sets: 6,
          reps: 3,
          rest: "2-3 min",
          notes: "Heavy MB; maximal velocity",
          category: "power",
          developmental: "Push-up throws or plyo push-ups 5×4"
        },
        {
          id: "tue-4",
          name: "Isometric Anchor Half-Squat Holds",
          sets: 4,
          duration: "10-12s",
          rest: "2-3 min",
          notes: "Against pins at ~110-120° knee angle; add band/chain",
          category: "isometric",
          developmental: "Bodyweight only to nail positions"
        },
        {
          id: "tue-5",
          name: "Weighted Chin-ups or Chest-Supported Row",
          sets: 4,
          reps: [6, 8],
          rest: "60-90s",
          notes: "Heavy",
          category: "accessory"
        },
        {
          id: "tue-6",
          name: "Neck (flex/ext/lat)",
          sets: 3,
          reps: 12,
          rest: "60s",
          notes: "Each plane",
          category: "accessory"
        },
        {
          id: "tue-7",
          name: "Grip (crush + pinch)",
          sets: 3,
          duration: "20-30s",
          rest: "60s",
          category: "accessory"
        }
      ]
    },

    thursday: {
      name: "POWER & BASE UNDER LOAD",
      description: "Lower-body speed + carries + lateral base",
      exercises: [
        {
          id: "thu-1",
          name: "Trap-Bar Jumps",
          sets: 6,
          reps: 3,
          percentage: [20, 40],
          rest: "full",
          notes: "Full reset every rep",
          category: "power",
          developmental: "Bodyweight or light DB"
        },
        {
          id: "thu-2",
          name: "Front-Squat Speed Sets",
          sets: 4,
          reps: 3,
          percentage: [60, 70],
          rest: "2-3 min",
          notes: "Bar speed ≥0.6-0.8 m/s if tracking velocity",
          category: "power"
        },
        {
          id: "thu-3",
          name: "Romanian Deadlift",
          sets: 4,
          reps: 6,
          percentage: [75, 80],
          rest: "60-90s",
          category: "strength",
          developmental: "3×8 @ ~70%"
        },
        {
          id: "thu-4",
          name: "Yoke Walk",
          sets: 5,
          distance: "20m",
          rest: "2-3 min",
          notes: "Heavy but clean (base width, brace, neutral torso)",
          category: "carries",
          alternative: "Farmer's Carries 5×30-40m heavy",
          developmental: "Moderate loads with perfect posture"
        },
        {
          id: "thu-5",
          name: "Backwards Sled Drags",
          sets: 6,
          distance: "20m",
          rest: "60-90s",
          notes: "Moderate-heavy",
          category: "accessory"
        },
        {
          id: "thu-6",
          name: "Lateral Shuffle March (band-resisted)",
          sets: 3,
          distance: "15m each side",
          rest: "60s",
          notes: "Hips low, feet under hips",
          category: "mechanics"
        }
      ]
    },

    friday: {
      name: "UPPER MAX + ARMOR & GAME-SPECIFIC ENERGY",
      description: "Upper max strength + conditioning",
      exercises: [
        {
          id: "fri-1",
          name: "Close-Grip Bench or Incline Bench",
          sets: 5,
          reps: [4, 6],
          percentage: [80, 88],
          rest: "2-4 min",
          category: "strength"
        },
        {
          id: "fri-2",
          name: "One-Arm Landmine Press",
          sets: 4,
          reps: 6,
          rest: "60-90s",
          notes: "Each side; transfer force through pillar",
          category: "accessory"
        },
        {
          id: "fri-3",
          name: "Heavy Single-Arm Row",
          sets: 4,
          reps: 8,
          rest: "60-90s",
          notes: "Each side",
          category: "accessory"
        },
        {
          id: "fri-4",
          name: "Anti-Rotation (Pallof / Cable Hold)",
          sets: 3,
          reps: [8, 10],
          rest: "60s",
          notes: "Each side; 2-3s holds",
          category: "accessory"
        },
        {
          id: "fri-5",
          name: "Neck + Grip",
          sets: 3,
          rest: "60s",
          notes: "Variation not used Tuesday",
          category: "accessory"
        },
        {
          id: "fri-6",
          name: "Play Clock Conditioning",
          blocks: [2, 3],
          reps: [8, 12],
          workRest: "5s : 25-35s",
          blockRest: "3-4 min",
          notes: "Prowler/sled, battle ropes, or short hills",
          category: "conditioning"
        }
      ]
    }
  },

  dayOrder: ["monday", "tuesday", "thursday", "friday"],

  kpis: [
    { id: "sprint-10m", name: "10m Sprint", unit: "seconds", lowerIsBetter: true },
    { id: "shuttle-5-10-5", name: "5-10-5 Shuttle", unit: "seconds", lowerIsBetter: true },
    { id: "front-squat-3rm", name: "Front Squat 3RM", unit: "lbs", lowerIsBetter: false },
    { id: "bench-3rm", name: "Bench Press 3RM", unit: "lbs", lowerIsBetter: false },
    { id: "mb-throw", name: "Med Ball Chest Throw", unit: "feet", lowerIsBetter: false },
    { id: "sled-push-10m", name: "Sled Push 10m (max power load)", unit: "seconds", lowerIsBetter: true }
  ],

  oneRepMaxExercises: [
    "Power Clean from Blocks",
    "Front Squat",
    "Barbell Hip Thrust",
    "Bench Press (Cluster)",
    "Push Press",
    "Trap-Bar Jumps",
    "Romanian Deadlift",
    "Close-Grip Bench or Incline Bench"
  ]
};
