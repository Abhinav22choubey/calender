// DayCell.tsx
interface Props {
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
  isInRange: boolean;
  onClick: () => void;
}

export default function DayCell({
  date,
  startDate,
  endDate,
  isInRange,
  onClick,
}: Props) {
  const isStart = startDate?.toDateString() === date.toDateString();
  const isEnd = endDate?.toDateString() === date.toDateString();

  return (
    <button
      onClick={onClick}
      className={`
        h-12 rounded-lg text-sm transition-all
        ${isStart || isEnd ? "bg-blue-600 text-white" : ""}
        ${isInRange ? "bg-blue-100" : "hover:bg-gray-100"}
      `}
    >
      {date.getDate()}
    </button>
  );
}