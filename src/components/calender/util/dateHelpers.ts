// utils/dateHelpers.ts

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return (day === 0 ? 6 : day - 1); 
};

export const generateCalendarDays = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days: (Date | null)[] = [];

  // Empty slots before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};

export const isSameDay = (d1: Date | null, d2: Date | null) => {
  if (!d1 || !d2) return false;
  return d1.toDateString() === d2.toDateString();
};

export const hasNoteForDate = (date: Date) => {
  const day = date.toISOString().split("T")[0];

  // Check all keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    // match notes_YYYY-MM-DD_*
    if (key.startsWith(`notes_${day}`)) {
      const value = localStorage.getItem(key);
      if (value && value.trim().length > 0) return true;
    }
  }

  return false;
};