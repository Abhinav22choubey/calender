# 📅 Modern Calendar App: Interactive Date Range Picker + Notes

A sleek, performance-driven calendar application built with **React, TypeScript, and Tailwind CSS**. This project focuses on a "State-Driven UI" philosophy, featuring highly fluid navigation logic and a robust date-range selection system.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

---
🔗 **[Live Demo Link Here](https://calender-psi-two.vercel.app/)** 

## 🎥 Video Demonstration

A short walkthrough showcasing the core features of the calendar component:

🔗 **Watch Demo:** https://youtu.be/gwHu6XfsfDI

### 📌 What’s Covered:
- 📅 Date range selection (start → end → reset)
- 🧠 Notes creation & persistence (localStorage)
- 🎬 Smooth animations & transitions
- 📱 Responsive behavior (desktop → mobile)


## 🚀 Core Philosophy
This project is designed around **state-driven UI**, where visual behavior is a direct derivative of the date state. Logic is centralized in helper functions to keep components clean, modular, and predictable.

---

## 🎬 Animation & Navigation Logic

The core of the user experience is the fluid transition system powered by **Framer Motion**. The calendar differentiates between navigation types using a `direction` state.

### ↔️ Horizontal Sliding (Month Navigation)
When switching between months, the grid uses an **X-axis** translation.
- **Logic:** The app calculates the index of the month. 
- **Right Slide:** Moving to a future month sets a positive direction value, causing the new month to enter from the right and the old one to exit to the left.
- **Left Slide:** Moving to a previous month reverses the coordinates.

### ↕️ Vertical Sliding (Month/Page Navigation)
For broader jumps (like changing Months or switching view layers), the calendar utilizes **Y-axis** translation.
- **Logic:** Triggered by the Month selector.
- **Up/Down Feel:** Gives the user a sense of "depth" or "scrolling" through time, distinguishing global changes (Years) from local changes (Months).

### 🛠️ Framer Motion Implementation
The implementation uses `AnimatePresence` with `custom` props:
- **Variants:** Defined as `enter`, `center`, and `exit`.
- **Dynamic Transition:** The `initial` and `exit` values are multiplied by the `direction` state variable, ensuring the animation always matches the user's intent.

---

## ✨ Functional Breakdown

### 📆 1. Smart Calendar Grid
- Generates a consistent **6x7 grid (42 cells)** using `generateCalendarDays`.
- Includes overflow days from the previous and next months to ensure no layout shifts during transitions.

### 🎯 2. Advanced Range Selection
- **Intuitive UX:** First click sets the start, second click sets the end, and a third click resets the selection.
- **Visual Feedback:** Real-time range highlighting and "in-between" states using pure CSS logic.

### 🧠 3. Persistent Notes System
- **Context-Aware:** Notes are tied to specific date ranges using a structured key format: `note-YYYY-MM-DD_to_YYYY-MM-DD`.
- **Storage:** Uses `localStorage` for persistence without needing a database.
- **Visual Indicators:** Date cells display a small dot indicator if they are part of a saved note range via the `hasNoteForDate()` helper.

---

## 🛠️ Tech Stack
- **Framework:** React (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** React Hooks (useState, useMemo)

---

## 📂 Project Structure
```text
components/calender/

├── hooks/
│   └── useDateRange.ts        # Core range selection logic
│
├── util/
│   └── dateHelpers.ts         # Calendar + date utilities
│
├── CalendarContainer.tsx      # Main controller (state holder)
├── CalendarGrid.tsx           # Grid layout (42 cells)
├── CalenderHeader.tsx         # Month navigation UI
├── DayCell.tsx                # Individual date cell
├── NotesPanel.tsx             # Notes system


```
## 📦 Installation & Setup

### Clone the repository
```bash
git clone https://github.com/Abhinav22choubey/calender.git
```

### Navigate to the directory
```bash
cd calender
```

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
npm run dev
```

---

## 👨‍💻 Author

**Abhinav Kumar Choubey**