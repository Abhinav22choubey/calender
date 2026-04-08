import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarHeader from "./CalenderHeader";
import CalendarGrid from "./CalenderGrid";
import NotesPanel from "./NotesPanel";
import { useDateRange } from "./hooks/useDateRange";
import calendertop from "/Images/calendertop.png";

type CalendarState = [number, number, number];

export default function CalendarContainer() {
  const range = useDateRange();
  const [[month, year, direction], setCalendarState] = useState<CalendarState>([
    new Date().getMonth(),
    new Date().getFullYear(),
    0,
  ]);

  const paginate = (newDirection: number) => {
    const nextDate = new Date(year, month + newDirection, 1);
    setCalendarState([
      nextDate.getMonth(),
      nextDate.getFullYear(),
      newDirection,
    ]);
  };

  /**
   * REALISTIC PAGE FLIP ANIMATION
   * Focuses on "Mass" and "Damping" to simulate heavy paper weight.
   */
  const variants: Variants = {
    enter: (direction: number) => ({
      // If going back (prev), start flipped up and drop down
      rotateX: direction < 0 ? -120 : 0,
      // If going forward (next), start slightly smaller and darker (underneath)
      scale: direction > 0 ? 0.96 : 1,
      opacity: direction > 0 ? 0.5 : 1,
      zIndex: 0,
    }),
    center: {
      rotateX: 0,
      scale: 1,
      opacity: 1,
      zIndex: 1,
      transition: {
        rotateX: {
          type: "spring",
          stiffness: 25, // Lower stiffness = slower movement
          damping: 18, // Higher damping = smoother, less "bouncy"
          mass: 1.2, // More mass = feels like heavy cardstock paper
        },
        scale: { duration: 0.8, ease: "circOut" },
        opacity: { duration: 0.6 },
      },
    },
    exit: (direction: number) => ({
      // When going Next, the current page flips UP and stays on top
      rotateX: direction > 0 ? -140 : 20,
      opacity: 0,
      zIndex: direction > 0 ? 50 : 0, // Keep exiting page on top during flip
      transition: {
        rotateX: {
          type: "spring",
          stiffness: 22, // Very slow lift
          damping: 15,
          mass: 1.5,
        },
        opacity: { duration: 0.5, delay: 0.2 }, // Fade out slowly as it clears the binder
      },
    }),
  };
  
  return (
    <div className="w-full min-h-screen bg-[#cacaca] flex justify-center items-start pt-20 sm:pt-32 relative overflow-hidden">
      {/* Lighting & Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />

      <div className="relative w-[95%] max-w-2xl group">
        {/* NAVIGATION BUTTONS - Floating "Pro" Style */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-16 lg:-left-24 z-[150]">
          <button
            onClick={() => paginate(-1)}
            className="p-4 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 group/btn border border-white/50 backdrop-blur-sm"
          >
            <ChevronLeft
              size={32}
              className="group-hover/btn:-translate-x-1 transition-transform"
            />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 -right-16 lg:-right-24 z-[150]">
          <button
            onClick={() => paginate(1)}
            className="p-4 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 group/btn border border-white/50 backdrop-blur-sm"
          >
            <ChevronRight
              size={32}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* STATIC BINDER TOP */}

        {/* CALENDAR MAIN BODY */}
        <div
          className="relative w-full bg-white rounded-b-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          style={{ perspective: "2500px" }}
        >
            <div className="absolute left-1/2 -translate-x-1/2 top-6 sm:top-11 -translate-y-[82%] w-[94%] z-[200]">
              <img
                src={calendertop}
                alt="binder"
                className="w-full drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
              />
            </div>
          {/* Header Area */}
          <div className="relative z-[100] bg-white border-b border-gray-100 p-2 flex flex-col items-center rounded-t-xl">
            <motion.span
              key={year}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-sm font-black tracking-[0.3em] text-gray-400 uppercase"
            >
              {year}
            </motion.span>
            <motion.h2
              key={month}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-serif italic font-bold text-gray-800 mt-1"
            >
              {new Date(year, month).toLocaleString("default", {
                month: "long",
              })}
            </motion.h2>
          </div>

          {/* ANIMATED PAGES CONTAINER */}
          <div className="relative min-h-[850px] overflow-visible">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={`${month}-${year}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  transformOrigin: "top center",
                  backfaceVisibility: "hidden",
                }}
                className="w-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-2 md:p-4"
              >
                {/* Paper Shading Overlay */}
                <motion.div className="absolute inset-0 pointer-events-none z-50 bg-gradient-to-b from-black/0 via-black/0 to-black/[0.02]" />

                {/* Calendar Content */}
                <CalendarHeader year={year} month={month} />
                <div className="flex flex-col lg:flex-row mt-6 gap-6">
                  <div className="w-full lg:w-48 border-r border-gray-50 pr-4">
                    <NotesPanel
                      startDate={range.startDate}
                      endDate={range.endDate}
                    />
                  </div>
                  <div className="flex-1">
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

                {/* The "Back" of the paper (only visible during flip) */}
                <div
                  className="absolute inset-0 bg-gray-100 z-[-1]"
                  style={{ transform: "rotateX(180deg)" }}
                />
              </motion.div>
            </AnimatePresence>

            {/* PHYSICAL STACK DEPTH (Background Pages) */}
            <div className="absolute inset-x-2 -bottom-2 h-full bg-white border border-gray-200 -z-10 rounded-b-xl shadow-md" />
            <div className="absolute inset-x-4 -bottom-4 h-full bg-white border border-gray-300 -z-20 rounded-b-xl shadow-sm" />
          </div>
        </div>

        {/* Floor Shadow */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[110%] h-16 bg-black/20 blur-[50px] rounded-[100%] -z-50" />
      </div>
    </div>
  );
}
