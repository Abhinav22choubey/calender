interface Props {
  idx: number;
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
  isInRange: boolean;
  accent: string;
  hasNote: boolean;
  onClick: () => void;
}

export default function DayCell({
  idx,
  date,
  startDate,
  endDate,
  isInRange,
  accent,
  hasNote,
  onClick,
}: Props) {
  const isStart = startDate?.toDateString() === date.toDateString();
  const isEnd = endDate?.toDateString() === date.toDateString();

  const today = new Date();
  const isToday = today.toDateString() === date.toDateString();

  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;

  return (
    <button
      onClick={onClick}
      className={`
        h-12 text-sm transition-all flex items-center justify-center
        ${isInRange ? "" : "hover:bg-gray-100"}
      `}
      style={{
        backgroundColor:
          isStart || isEnd ? accent : isInRange ? `${accent}30` : undefined,

        color:
          isStart || isEnd
            ? "white"
            : isWeekend && !isStart && !isEnd
              ? accent
              : undefined,
      }}
    >
      <div className="relative w-9 h-9 flex items-center justify-center rounded-full">
        {/* Date */}
        <span
          style={{
            backgroundColor:
              isToday && !isStart && !isEnd ? accent : "transparent",
            color: isToday && !isStart && !isEnd ? "white" : undefined,
          }}
          className="w-full h-full flex items-center justify-center rounded-full"
        >
          {date.getDate()}
        </span>

        {/* 🔴 SMALL BLACK DOT */}
        {hasNote && (
          <span className="absolute bottom-0.5 w-1.5 h-1.5 bg-black rounded-full" />
        )}
      </div>
    </button>
  );
}
