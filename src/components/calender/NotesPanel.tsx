import { useState, useEffect } from "react";
import { Plus, Trash2, Calendar as CalendarIcon, AlignLeft } from "lucide-react";

interface NoteEntry {
  id: string;
  text: string;
  timestamp: number;
}

export default function NotesPanel({
  startDate,
  endDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
}) {
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [inputValue, setInputValue] = useState("");

  const getStorageKey = () => {
    if (!startDate) return null;
    const start = startDate.toISOString().split("T")[0];
    const end = endDate ? endDate.toISOString().split("T")[0] : "single";
    return `notes_v2_${start}_${end}`;
  };

  const getDayCount = () => {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(startDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const diff = end.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  useEffect(() => {
    const key = getStorageKey();
    if (!key) {
      setNotes([]);
      return;
    }
    const saved = localStorage.getItem(key);
    setNotes(saved ? JSON.parse(saved) : []);
  }, [startDate, endDate]);

  useEffect(() => {
    const key = getStorageKey();
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!inputValue.trim()) return;
    const newNote: NoteEntry = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      timestamp: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setInputValue("");
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  return (
    <div className="p-0 h-full flex flex-col bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-black/5 shadow-inner">
      {/* Compact Header */}
      <div className="p-3 pb-2 border-b border-black/5 bg-white/40">
        <div className="flex items-center gap-2 mb-1">
          <AlignLeft size={16} className="text-zinc-500" />
          <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-tighter">Notes</h3>
        </div>

        {startDate ? (
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
            <CalendarIcon size={10} />
            <span className="truncate">
              {startDate.toLocaleDateString()} {endDate && `— ${endDate.toLocaleDateString()}`}
            </span>
            <span className="text-blue-500 font-bold ml-auto">
              {getDayCount()}D
            </span>
          </div>
        ) : (
          <span className="text-[10px] text-zinc-400 italic">Select dates</span>
        )}
      </div>

      {/* Lined Paper Section - Maximized Internal Space */}
      <div 
        className="flex-1 overflow-y-auto relative scrollbar-hide"
        style={{
          backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '100% 2rem', // Slightly smaller line height to fit more notes
          backgroundColor: '#fff',
          lineHeight: '2rem'
        }}
      >
        {/* Tightened Left Margin Line (Red Line) */}
        <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-red-200/60" />

        <div className="relative">
          {notes.length === 0 && !inputValue && (
            <div className="pl-10 pr-2 text-zinc-300 italic text-[11px] mt-2">
              Empty entry...
            </div>
          )}

          {notes.map((note) => (
            <div
              key={note.id}
              className="group relative flex hover:bg-blue-50/40 transition-colors"
              style={{ minHeight: '2rem' }}
            >
              {/* Narrow Time column */}
              <div className="w-8 flex-shrink-0 flex justify-center pt-[2px]">
                <span className="text-[8px] font-bold text-zinc-400 mt-3">
                  {new Date(note.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
                </span>
              </div>

              {/* Note Content - Wider padding-left relative to total width */}
              <div className="pl-3 pr-8 flex-1">
                <p className="text-xs text-zinc-700 leading-[2rem] whitespace-pre-wrap font-medium">
                  {note.text}
                </p>
              </div>

              <button
                onClick={() => deleteNote(note.id)}
                className="absolute right-1 top-2 opacity-0 group-hover:opacity-100 p-1 text-zinc-300 hover:text-red-500"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Low-Profile Input Area */}
      <div className="p-2 bg-zinc-50/80 border-t border-zinc-200">
        <div className="relative flex items-center gap-1 bg-white rounded border border-zinc-300 px-2 py-1 focus-within:ring-1 focus-within:ring-blue-500/30">
          <textarea
            disabled={!startDate}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="..."
            className="w-full h-7 text-xs resize-none outline-none bg-transparent pt-1.5"
            rows={1}
          />
          <button
            onClick={handleAddNote}
            disabled={!inputValue.trim() || !startDate}
            className="p-1.5 bg-zinc-800 text-white rounded hover:bg-black disabled:bg-zinc-300 transition-colors flex-shrink-0"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}