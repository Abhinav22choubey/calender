import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import CalendarHeader from "./CalenderHeader";
import CalendarGrid from "./CalenderGrid";
import NotesPanel from "./NotesPanel";
import { useDateRange } from "./hooks/useDateRange";
import calendertop from "/Images/calendertop.png";

// Define the state type for the paginator
type CalendarState = [number, number, number]; // [month, year, direction]

export default function CalendarContainer() {
  const range = useDateRange(); // Assumed to return { startDate: Date, endDate: Date }

  // We keep track of [month, year, direction] in a single state to sync animations
  const [[month, year, direction], setCalendarState] = useState<CalendarState>([
    new Date().getMonth(),
    new Date().getFullYear(),
    0,
  ]);

  const currentDate = new Date(year, month);

  const paginate = (newDirection: number) => {
    const nextDate = new Date(year, month + newDirection, 1);
    setCalendarState([
      nextDate.getMonth(),
      nextDate.getFullYear(),
      newDirection,
    ]);
  };

  /**
   * Animation Variants
   * direction > 0 = Next (Page flips up)
   * direction < 0 = Previous (Page flips down)
   */
  const flipVariants: Variants = {
    enter: (direction: number) => ({
      rotateX: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      rotateX: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateX: direction > 0 ? -80 : 80,
      opacity: 0,
      position: "absolute", // Keep exiting element out of the flow
      zIndex: 0,
    }),
  };

  return (
    <div className="w-full min-h-screen max-h-screen bg-neutral-200 flex justify-center items-start pt-10 sm:pt-16 relative overflow-x-hidden">
      <div className="relative w-[95%] max-w-xl">
        {/* Spiral Image (Fixed at top) */}
        <img
          src={calendertop}
          alt="calendar-top"
          className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[60%] w-[70%] sm:w-[55%] md:w-[75%] lg:w-[70%] max-w-[600px] z-30 pointer-events-none select-none"
        />

        {/* Calendar Body */}
        <div
          className="w-full bg-white shadow-2xl rounded-b-xl border border-gray-200 relative overflow-hidden"
          style={{ perspective: "1200px" }} // Required for 3D flip effect
        >
          {/* Subtle paper shadow overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/5 z-10"></div>

          {/* Controls - Stay static while content flips */}
          <div className="relative z-20 flex items-center justify-between px-4 py-2 border-b border-black/20 bg-white">
            <button
              onClick={() => paginate(-1)}
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors z-30"
            >
              ←
            </button>

            <div className="font-semibold text-lg">
              {currentDate.toLocaleString("default", { month: "long" })} {year}
            </div>

            <button
              onClick={() => paginate(1)}
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors z-30"
            >
              →
            </button>
          </div>

          {/* Animated Container */}
          <div className="relative min-h-[450px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={`${month}-${year}`}
                custom={direction}
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  rotateX: { type: "spring", stiffness: 100, damping: 20 },
                  opacity: { duration: 0.2 },
                }}
                // Ensures rotation happens from the top spiral area
                style={{ transformOrigin: "top", width: "100%" }}
              >
                <CalendarHeader year={year} month={month} />

                <div className="flex flex-col lg:flex-row">
                  {/* LEFT */}
                  <div className="w-full lg:w-[280px] bg-white">
                    <NotesPanel
                      startDate={range.startDate}
                      endDate={range.endDate}
                    />
                  </div>

                  {/* RIGHT */}
                  <div className="flex-1 min-w-0">
                    <CalendarGrid
                      startDate={range.startDate}
                      endDate={range.endDate}
                      year={year}
                      month={month}
                      handleDateClick={range.handleDateClick}
                      isInRange={range.isInRange}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Shadow */}
        <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[70%] sm:w-[60%] h-6 bg-black/20 blur-2xl rounded-full"></div>
      </div>
    </div>
  );
}
