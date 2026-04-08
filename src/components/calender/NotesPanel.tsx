import { useState, useEffect } from "react";

export default function NotesPanel({
  startDate,
  endDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
}) {
  const [note, setNote] = useState("");

  const getStorageKey = () => {
    if (!startDate) return null;

    const start = startDate.toISOString().split("T")[0];
    const end = endDate ? endDate.toISOString().split("T")[0] : "single";

    return `notes_${start}_${end}`;
  };

  useEffect(() => {
    const key = getStorageKey();
    if (!key) {
      setNote("");
      return;
    }

    const savedNote = localStorage.getItem(key);
    setNote(savedNote || "");
  }, [startDate, endDate]);

  useEffect(() => {
    const key = getStorageKey();
    if (!key) return;

    localStorage.setItem(key, note);
  }, [note, startDate, endDate]);

  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="font-semibold mb-2">Notes</h3>

      <div className="text-sm text-gray-500 mb-2">
        {startDate
          ? `${startDate.toDateString()} ${
              endDate
                ? `→ ${endDate.toDateString()} , ${Math.ceil(
                    (endDate.getTime() - startDate.getTime()) /
                      (1000 * 60 * 60 * 24),
                  )} days`
                : ""
            }`
          : "Select a date range"}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes..."
        className="flex-1 border border-zinc-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
