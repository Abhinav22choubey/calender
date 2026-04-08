// CalendarGrid.tsx
import DayCell from "./DayCell";
import { generateCalendarDays } from "./util/dateHelpers";
interface Props {
  year: number;
  month: number;
  startDate: Date | null;
  endDate: Date | null;
  handleDateClick: (date: Date) => void;
  isInRange: (date: Date) => boolean;
}

export default function CalendarGrid({
  startDate,
  endDate,
  handleDateClick,
  isInRange,
}: Props) {
  const days = generateCalendarDays(2026, 1);

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500 mb-2">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, idx) => (
          <div className={idx > 4 ? "text-blue-500" : ""} key={d}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((date, idx) =>
          date ? (
            <DayCell
              idx={idx}
              key={date.toISOString()}
              date={date}
              startDate={startDate}
              endDate={endDate}
              isInRange={isInRange(date)}
              onClick={() => handleDateClick(date)}
            />
          ) : (
            <div key={idx} /> // empty cell
          ),
        )}
      </div>
    </div>
  );
}
