import CalendarHeader from "./CalenderHeader";
import CalendarGrid from "./CalenderGrid";
import NotesPanel from "./NotesPanel";
import { useDateRange } from "./hooks/useDateRange";
import calendertop from "/Images/calendertop.png";

export default function CalendarContainer() {
  const range = useDateRange();

  return (
    <div className="w-full min-h-screen bg-neutral-200 flex justify-center items-start pt-10 sm:pt-16 relative overflow-x-hidden">
      
      {/* Wrapper */}
      <div className="relative w-[95%] max-w-xl">
        
        {/* Spiral Image */}
        <img
          src={calendertop}
          alt="calendar-top"
          className="
            absolute 
            left-1/2 -translate-x-1/2 
            top-0 -translate-y-[60%]

            w-[70%] sm:w-[55%] md:w-[45%] lg:w-[40%]
            max-w-[600px]

            z-20 
            pointer-events-none 
            select-none
          "
        />

        {/* Calendar Body */}
        <div
          className="
            w-full 
            bg-white 
            shadow-2xl 
            rounded-b-xl 
            border border-gray-200 
            relative 
            overflow-visible
          "
        >
          {/* Paper depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/5"></div>

          <CalendarHeader />

          <div className="flex flex-col lg:flex-row">
            
            {/* LEFT */}
            <div className="w-full lg:w-[280px] border-t lg:border-t-0 lg:border-l bg-white">
              <NotesPanel startDate={range.startDate} endDate={range.endDate} />
            </div>

            {/* RIGHT */}
            <div className="flex-1 min-w-0">
              <CalendarGrid {...range} />
            </div>

          </div>
        </div>

        {/* Bottom Shadow */}
        <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[70%] sm:w-[60%] h-6 bg-black/20 blur-2xl rounded-full"></div>
      </div>
    </div>
  );
}