// CalendarHeader.tsx
export default function CalendarHeader() {
  return (
    <div className="relative h-52 w-full">
      
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <h2 className="text-2xl font-bold">January 2026</h2>
      </div>
    </div>
  );
}