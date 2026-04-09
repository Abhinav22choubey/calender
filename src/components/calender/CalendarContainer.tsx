import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarHeader from "./CalenderHeader";
import CalendarGrid from "./CalenderGrid";
import NotesPanel from "./NotesPanel";
import { useDateRange } from "./hooks/useDateRange";
import calendertop from "/Images/calendertop.png";

type CalendarState = [number, number, number];

const bodyGradients = [
  "from-blue-100 via-white to-blue-200",
  "from-pink-100 via-white to-pink-200",
  "from-green-100 via-white to-green-200",
  "from-yellow-100 via-white to-orange-200",
  "from-orange-100 via-white to-red-200",
  "from-cyan-100 via-white to-blue-200",
  "from-emerald-100 via-white to-green-200",
  "from-indigo-100 via-white to-purple-200",
  "from-amber-100 via-white to-yellow-200",
  "from-red-100 via-white to-orange-200",
  "from-gray-200 via-white to-gray-300",
  "from-blue-200 via-white to-indigo-300",
];

const accentColors = [
  "#3b82f6",
  "#ec4899",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#06b6d4",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#dc2626",
  "#6b7280",
  "#6366f1",
];

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

  const variants: Variants = {
    enter: (direction: number) => ({
      rotateX: direction < 0 ? -120 : 0,
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
          stiffness: 25,
          damping: 18,
          mass: 1.2,
        },
        scale: { duration: 0.8, ease: "circOut" },
        opacity: { duration: 0.6 },
      },
    },
    exit: (direction: number) => ({
      rotateX: direction > 0 ? -140 : 20,
      opacity: 0,
      zIndex: direction > 0 ? 50 : 0,
      transition: {
        rotateX: {
          type: "spring",
          stiffness: 22,
          damping: 15,
          mass: 1.5,
        },
        opacity: { duration: 0.5, delay: 0.2 },
      },
    }),
  };

  return (
    <div
      className="w-full min-h-full pb-80 mb-10 bg-[#d6d6d6] flex justify-center items-start pt-20 sm:pt-32 relative overflow-visible"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, #f0f0f0 0%, #d6d6d6 50%, #bcbcbc 100%)",
      }}
    >
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
        }}
      />

      <div className="relative w-[95%] max-w-2xl group">

        {/* NAV */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-16 lg:-left-24 z-[150]">
          <button
            onClick={() => paginate(-1)}
            className="p-4 bg-white/80 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronLeft size={32} />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 -right-16 lg:-right-24 z-[150]">
          <button
            onClick={() => paginate(1)}
            className="p-4 bg-white/80 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* BODY */}
        <div
          className="relative w-full bg-transparent"
          style={{
            perspective: "2500px",
            filter:
              "drop-shadow(15px 25px 10px rgba(0,0,0,0.1)) drop-shadow(40px 60px 40px rgba(0,0,0,0.15))",
          }}
        >
          {/* Binder */}
          <div className="absolute left-1/2 -translate-x-1/2 top-6 sm:top-11 -translate-y-[82%] w-[94%] z-[200]">
            <img
              src={calendertop}
              className="w-full drop-shadow-[5px_10px_8px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* PAGES */}
          <div className="relative h-fit overflow-visible pb-8">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
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
                  transformStyle: "preserve-3d",
                }}
                className="w-full relative h-fit overflow-visible rounded-sm transform-gpu"
              >
                {/* BACKGROUND */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${bodyGradients[month]} transition-all duration-700`}
                />

                {/* CONTENT */}
                <div className="relative z-10 p-2 md:p-4">
                  <CalendarHeader year={year} month={month} />

                  <div className="flex flex-col lg:flex-row mt-6 gap-6">
                    <div className="w-full lg:w-48 border-r border-white/20 pr-4">
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
                        accent={accentColors[month]}
                      />
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${bodyGradients[month]} z-[-1]`}
                    style={{ transform: "rotateX(180deg)" }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* STACK */}
            <div className="absolute inset-x-2 -bottom-2 h-full bg-[#fcfcfc] border-r border-b border-black/10 -z-10 rounded-b-sm" />
            <div className="absolute inset-x-4 -bottom-4 h-full bg-[#f5f5f5] border-r border-b border-black/10 -z-20 rounded-b-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}