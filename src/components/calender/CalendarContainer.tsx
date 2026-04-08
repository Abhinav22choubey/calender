import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import CalendarHeader from "./CalenderHeader";
import CalendarGrid from "./CalenderGrid";
import NotesPanel from "./NotesPanel";
import { useDateRange } from "./hooks/useDateRange";
import calendertop from "/Images/calendertop.png";
import { ChevronLeft, ChevronRight } from "lucide-react";


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

  const curlVariants: Variants = {
    enter: (direction: number) => ({
      rotateX: direction < 0 ? -110 : 0,
      scaleY: direction < 0 ? 0.9 : 1,
      y: direction < 0 ? -20 : 0,
      opacity: 0,
      filter: "brightness(1)",
    }),
    center: {
      rotateX: 0,
      scaleY: 1,
      y: 0,
      opacity: 1,
      filter: "brightness(1)",
      transition: {
        type: "spring",
        stiffness: 40, 
        damping: 12,
        mass: 1,
      },
    },
    exit: (direction: number) => ({
      rotateX: direction > 0 ? -110 : 0, 
      scaleY: direction > 0 ? 0.85 : 1, 
      y: direction > 0 ? -10 : 20, 
      opacity: direction > 0 ? 0 : 0,
      filter: "brightness(0.6)", 
      transition: {
        duration: 0.6,
        ease: [0.45, 0.05, 0.55, 0.95], 
      },
    }),
  };

  return (
    <div className="w-full min-h-screen bg-neutral-300 flex justify-center items-start pt-20 sm:pt-28 relative overflow-hidden">
      {/* Wall Texture/Background Shadow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.05)_0%,transparent_70%)]"></div>

      <div className="relative w-[95%] max-w-xl">
        {/* The Spiral Hanger (Static) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-3 md:top-4 -translate-y-[70%] w-[90%] z-[100] drop-shadow-xl">
          <img
            src={calendertop}
            alt="calendar-top"
            className="w-full pointer-events-none select-none"
          />
        </div>

        {/* The Calendar Body */}
        <div
          className="w-full bg-[#fdfdfd] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rounded-b-sm relative"
          style={{ perspective: "2500px" }}
        >
          <div className="relative z-[110] flex items-center justify-between px-6 py-4 bg-white/90 border-b border-gray-200">
            <button
              onClick={() => paginate(-1)}
              className="hover:scale-125 transition-transform cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="font-serif text-2xl font-bold italic text-gray-700">
              {new Date(year, month).toLocaleString("default", {
                month: "long",
              })}{" "}
              {year}
            </div>

            <button
              onClick={() => paginate(1)}
              className="hover:scale-125 transition-transform cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          {/* Animated Page Stack */}
          <div className="relative min-h-[550px] overflow-visible">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={`${month}-${year}`}
                custom={direction}
                variants={curlVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  transformOrigin: "top center",
                  width: "100%",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
                className="bg-white shadow-inner"
              >
                {/* Simulated Paper Shadow (Inner Shadow that appears as it curls) */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0 }}
                  exit={{
                    opacity: 0.4,
                    background:
                      "linear-gradient(to bottom, transparent 50%, black 100%)",
                  }}
                />

                <CalendarHeader year={year} month={month} />

                <div className="flex flex-col lg:flex-row">
                  <div className="w-full lg:w-[260px] border-r border-gray-100 p-4">
                    <NotesPanel
                      startDate={range.startDate}
                      endDate={range.endDate}
                    />
                  </div>
                  <div className="flex-1 p-2">
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

                {/* Subtle Page Edge Shadow */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/10"></div>
              </motion.div>
            </AnimatePresence>

            {/* Background "Ghost" Pages (Simulates the thickness of the calendar) */}
            <div className="absolute inset-0 bg-white -z-10 translate-y-1 translate-z-[-1px] border-b border-gray-300"></div>
            <div className="absolute inset-0 bg-white -z-20 translate-y-2 translate-z-[-2px] border-b border-gray-400"></div>
          </div>
        </div>

        {/* Real-world floor shadow */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[110%] h-20 bg-black/10 blur-[60px] rounded-[100%] -z-50"></div>
      </div>
    </div>
  );
}
