export default function CalendarHeader() {
  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* SVG clip (triangle with rounded tip) */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="Triangle" clipPathUnits="objectBoundingBox">
            <path
              d="
              M 0 0
              L 1 0
              L 1 0.5
              L 0.56 0.90
              Q 0.47 0.97 0.42 0.93
              L 0 0.7
              Z
            "
            />
          </clipPath>
        </defs>
      </svg>

      {/* IMAGE */}
      {/* IMAGE */}
      <div
        className="w-full z-10 h-full overflow-hidden shadow-xl relative"
        style={{ clipPath: "url(#Triangle)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          className="w-full h-full object-cover"
        />
      </div>

      {/* LEFT BLUE */}
      <div
        className="absolute z-0 bottom-2 left-0 w-32 h-32 bg-blue-400 rotate-90"
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
      />
      {/* RIGHT BLUE */}
      <div
        className="absolute bottom-2 -right-20 w-4/6 h-80 bg-blue-400 flex items-end justify-end p-4 text-white"
        style={{ clipPath: "url(#Triangle)" }}
      >
        <div className="text-right pr-29 pb-12">
          <p className="text-sm tracking-widest">2026</p>
          <h2 className="text-xl font-bold">JANUARY</h2>
        </div>
      </div>
    </div>
  );
}
