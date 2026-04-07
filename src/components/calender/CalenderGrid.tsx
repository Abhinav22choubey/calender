// CalendarGrid.tsx
import DayCell from "./DayCell";

interface Props {
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
  const days = Array.from({ length: 31 }, (_, i) => new Date(2026, 0, i + 1));

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500 mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((date) => (
          <DayCell
            key={date.toISOString()}
            date={date}
            startDate={startDate}
            endDate={endDate}
            isInRange={isInRange(date)}
            onClick={() => handleDateClick(date)}
          />
        ))}
      </div>
    </div>
  );
}