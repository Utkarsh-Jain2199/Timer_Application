# React Native Timer App

## Objective
Build a React Native app that allows users to create, manage, and interact with multiple customizable timers. The app will include features like categories, progress visualization, and grouped actions while maintaining clean UI/UX and minimal third-party dependencies.

---

## Features

### 1. Core Features

#### 1.1 Add Timer
- Screen to create new timers with the following fields:
  - **Name:** The name of the timer (e.g., "Workout Timer").
  - **Duration:** Timer duration in seconds.
  - **Category:** Assign a category to the timer (e.g., "Workout," "Study," "Break").
- Save timers to a list and persist data using **AsyncStorage**.

#### 1.2 Timer List with Grouping
- Display timers grouped by their categories in expandable/collapsible sections.
- Each timer displays:
  - **Name**
  - **Remaining Time**
  - **Status:** Running, Paused, or Completed
- Users can expand or collapse categories to view timers within them.

#### 1.3 Timer Management
- Provide controls for each timer to:
  - **Start:** Begin countdown.
  - **Pause:** Pause countdown.
  - **Reset:** Reset to original duration.
- Mark timers as **Completed** when they reach zero.

#### 1.4 Progress Visualization
- Show a simple progress bar or percentage for each timer to visualize remaining time relative to total duration.

#### 1.5 Bulk Actions
- Add buttons at the category level to:
  - Start all timers in a category.
  - Pause all timers in a category.
  - Reset all timers in a category.

#### 1.6 User Feedback
- When a timer completes:
  - Show an **on-screen modal** with a congratulatory message and the timer’s name.

---

### 2. Enhanced Functionality

#### 2.1 Timer History
- Maintain a **log** of completed timers with:
  - Timer name
  - Completion time
- Display the log on a separate **"History"** screen.

#### 2.2 Customizable Alerts
- Allow users to set an **optional halfway alert** for each timer (e.g., at 50% of the total duration).
- Display a notification or message when the alert triggers.

---

## Technical Details

### **State Management**
- Use **useState** or **useReducer** for managing timers and categories.

### **Navigation**
- Use **React Navigation** with at least two screens:
  1. **Home Screen:** Timer list and grouping functionality.
  2. **History Screen:** Log of completed timers.

### **Persistence**
- Use **AsyncStorage** for storing timers and logs.

### **Styling**
- Use **StyleSheet** for clean and responsive layouts.

### **Timers**
- Implement time management logic using **setInterval**.

---

## Installation & Setup

### **1. Clone the Repository**
```sh
 git clone <repository-url>
 cd react-native-timer-app
```

### **2. Install Dependencies**
```sh
 npm install  # or yarn install
```

### **3. Run the Application**
#### For Android:
```sh
 npx react-native run-android
```
#### For iOS:
```sh
 npx react-native run-ios
```

---

## Future Improvements
- Add support for push notifications.
- Implement dark mode.
- Add sound alerts for timer completion.

---

