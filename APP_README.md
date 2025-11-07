# O-Line Training App

A comprehensive web application for tracking the Offensive Line Training Program. Built with React and Vite for a fast, modern, mobile-friendly experience.

## Features

### 🏋️ Workout Tracking
- View daily workouts organized by training day (Mon, Tue, Thu, Fri)
- Automatic working weight calculation based on your 1RM
- Log completed sets with weights and notes
- Track exercise completion per session
- Developmental modifications for younger/newer lifters

### 📊 Progress Monitoring
- Track Key Performance Indicators (KPIs):
  - 10m Sprint
  - 5-10-5 Shuttle
  - Front Squat 3RM
  - Bench Press 3RM
  - Med Ball Chest Throw
  - Sled Push 10m
- View improvement percentages over time
- Complete workout history by exercise
- Visual progress charts

### 🧮 1RM Calculator
- Calculate one-rep max using the Epley formula
- Save 1RMs for all primary exercises
- Automatic working weight percentages (70%, 80%, 85%, 90%)
- View all saved 1RMs with update dates

### ⚙️ Settings & Data Management
- User profile (name, age, body weight, experience level)
- Training phase selector (Accumulation, Intensification, Conversion)
- Current week tracker (1-12)
- Export/import all data as JSON
- Clear all data option

### 📱 Progressive Web App
- Install on mobile devices
- Works offline after first load
- Responsive design for all screen sizes
- Dark mode support

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized production files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### First Time Setup

1. **Set Up Your Profile**
   - Go to Settings
   - Enter your name, age, and body weight
   - Select your experience level (Advanced or Developmental)
   - Save your profile

2. **Set Your Training Phase**
   - In Settings, select your current phase:
     - **Weeks 1-4:** Accumulation
     - **Weeks 5-8:** Intensification
     - **Weeks 9-12:** Power/Conversion
   - Set your current week number

3. **Add Your 1RMs**
   - Go to 1RM Calculator
   - Either calculate from a recent lift or enter manually
   - Save for each primary exercise
   - These are used to calculate working weights automatically

### Daily Workout Flow

1. **Select Your Training Day**
   - From Home, click on today's workout (Mon/Tue/Thu/Fri)
   - Or use the Workout page to select any day

2. **View Exercise Details**
   - Each exercise shows:
     - Sets, reps, and percentages
     - Working weight (if 1RM is saved)
     - Rest periods
     - Technique notes
     - Developmental modifications (if applicable)

3. **Log Your Sets**
   - Enter the weight you used
   - Add optional notes (e.g., "felt heavy", "bar speed good")
   - Click "Log" to save
   - Exercise marks as complete

4. **Complete Your Session**
   - When all exercises are logged, you'll see a completion message
   - Don't forget the Daily Vault work!

### Tracking Progress

1. **Monthly KPI Testing**
   - Go to Progress page
   - Click "+ Add Test"
   - Select the KPI and enter your result
   - View improvements over time

2. **Review Workout History**
   - See all logged workouts by exercise
   - Track weight progression
   - Review notes from past sessions

### Data Management

**Export Your Data:**
- Settings → Data Management → Export All Data
- Downloads a JSON file with all your data
- Use for backups or transferring devices

**Import Data:**
- Settings → Data Management → Import Data
- Select a previously exported JSON file
- Restores all data

**Note:** All data is stored locally in your browser. No server or cloud storage is used.

## Program Overview

### Training Split

**Monday - Drive Block Force**
- Power cleans, front squats, heavy sled push
- Focus: Horizontal force production

**Tuesday - Pass-Pro Power & Strike**
- Cluster bench press, push press, anchor holds
- Focus: Striking power and isometric anchor strength

**Thursday - Power & Base Under Load**
- Trap-bar jumps, yoke walks, sled drags
- Focus: Explosive power and trunk stability

**Friday - Upper Max + Conditioning**
- Close-grip bench, landmine press, play-clock conditioning
- Focus: Max strength and game-specific energy systems

### Phase Progression

**Weeks 1-4: Accumulation**
- Higher volume (5×5, 4×6)
- Moderate intensity (70-80% 1RM)
- Build work capacity and technique

**Weeks 5-8: Intensification**
- Lower volume (4×4, 5×3)
- Higher intensity (82-90% 1RM)
- Maximize strength gains

**Weeks 9-12: Power/Conversion**
- Focus on bar speed (3-4×3)
- Moderate intensity (80-85% 1RM)
- Convert strength to explosive power

## Tech Stack

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Vite** - Build tool and dev server
- **Local Storage API** - Data persistence
- **CSS Variables** - Theming and dark mode

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

This app is designed for the Veldheer Offensive Line Training Program. For questions or improvements, please contact the program administrator.

## License

© 2024 Veldheer Offensive Line Training Program. All rights reserved.
