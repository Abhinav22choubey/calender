// CalendarGrid.tsx
import DayCell from "./DayCell";
import { generateCalendarDays } from "./util/dateHelpers";
import { hasNoteForDate } from "./util/dateHelpers";
interface Props {
  year: number;
  month: number;
  startDate: Date | null;
  endDate: Date | null;
  accent: string;
  handleDateClick: (date: Date) => void;
  isInRange: (date: Date) => boolean;
}

export default function CalendarGrid({
  startDate,
  endDate,
  year,
  month,
  handleDateClick,
  isInRange,
  accent,
}: Props) {
  const days = generateCalendarDays(year, month);

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500 mb-2">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, idx) => (
          <div
            key={d}
            style={{
              color: idx > 4 ? accent : undefined,
            }}
          >
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
              accent={accent}
               hasNote={hasNoteForDate(date)}
            />
          ) : (
            <div key={idx} /> // empty cell
          ),
        )}
      </div>
    </div>
  );
}
