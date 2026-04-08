// DayCell.tsx
interface Props {
  idx: number;
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
  isInRange: boolean;
  onClick: () => void;
}

export default function DayCell({
  idx,
  date,
  startDate,
  endDate,
  isInRange,
  onClick,
}: Props) {
  const isStart = startDate?.toDateString() === date.toDateString();
  const isEnd = endDate?.toDateString() === date.toDateString();
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  return (
    <button
      onClick={onClick}
      className={`
        h-12 rounded-lg text-sm transition-all

        ${isStart || isEnd ? "bg-blue-600 text-white" : ""}

        ${isInRange ? "bg-blue-100" : "hover:bg-gray-100"}

        ${isWeekend && !isStart && !isEnd ? "text-blue-500" : ""}
      `}
    >
      {date.getDate()}
    </button>
  );
}
