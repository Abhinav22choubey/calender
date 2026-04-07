export default function CalendarHeader() {
  return (
    <div className="relative w-full h-96">
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
      <div
        className="w-full h-full overflow-hidden  shadow-xl"
        style={{ clipPath: "url(#Triangle)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          className="w-full h-full object-cover"
        />
      </div>

      {/* LEFT BLUE */}
      <div
        className="absolute bottom-0 left-0 w-1/3 h-28 bg-blue-500"
        style={{
          clipPath: "polygon(0 100%, 0 30%, 100% 100%)",
        }}
      />

      {/* RIGHT BLUE */}
      <div
        className="absolute bottom-0 right-0 w-1/3 h-28 bg-blue-500 flex items-end justify-end p-4 text-white"
        style={{
          clipPath: "polygon(0 100%, 100% 30%, 100% 100%)",
        }}
      >
        <div className="text-right">
          <p className="text-sm tracking-widest">2026</p>
          <h2 className="text-xl font-bold">JANUARY</h2>
        </div>
      </div>
    </div>
  );
}
