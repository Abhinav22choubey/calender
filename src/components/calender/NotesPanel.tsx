// NotesPanel.tsx
import { useState } from "react";

export default function NotesPanel({
  startDate,
  endDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
}) {
  const [note, setNote] = useState("");

  return (
    <div className="p-4 h-full flex flex-col">
      
      <h3 className="font-semibold mb-2">Notes</h3>

      <div className="text-sm text-gray-500 mb-2">
        {startDate
          ? `${startDate.toDateString()} ${
              endDate ? `→ ${endDate.toDateString()}` : ""
            }`
          : "Select a date range"}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes..."
        className="flex-1 border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}