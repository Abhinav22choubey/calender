import { motion } from "framer-motion";

type Props = {
  year: number;
  month: number;
};

const monthThemes: Record<
  number,
  { image: string; gradient: string; accent: string }
> = {
  0: {
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    gradient: "from-blue-900/70 via-blue-700/40 to-transparent",
    accent: "#3b82f6",
  },
  1: {
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    gradient: "from-pink-800/60 via-pink-500/30 to-transparent",
    accent: "#ec4899",
  },
  2: {
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
    gradient: "from-green-800/60 via-green-500/30 to-transparent",
    accent: "#22c55e",
  },
  3: {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    gradient: "from-yellow-700/60 via-orange-500/30 to-transparent",
    accent: "#f97316",
  },
  4: {
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    gradient: "from-orange-800/60 via-red-500/30 to-transparent",
    accent: "#ef4444",
  },
  5: {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    gradient: "from-cyan-900/70 via-blue-600/30 to-transparent",
    accent: "#06b6d4",
  },
  6: {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    gradient: "from-green-900/60 via-emerald-500/30 to-transparent",
    accent: "#10b981",
  },
  7: {
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    gradient: "from-indigo-900/60 via-purple-500/30 to-transparent",
    accent: "#8b5cf6",
  },
  8: {
    image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c9ce",
    gradient: "from-yellow-800/60 via-amber-500/30 to-transparent",
    accent: "#f59e0b",
  },
  9: {
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    gradient: "from-orange-900/60 via-red-600/30 to-transparent",
    accent: "#dc2626",
  },
  10: {
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    gradient: "from-gray-900/70 via-gray-700/40 to-transparent",
    accent: "#6b7280",
  },
  11: {
    image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    gradient: "from-blue-900/70 via-indigo-700/40 to-transparent",
    accent: "#6366f1",
  },
};

export default function CalendarHeader({ year, month }: Props) {
  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  const theme = monthThemes[month];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden isolate">
      
      {/* SVG CLIP PATH (UNCHANGED) */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="Triangle" clipPathUnits="objectBoundingBox">
            <path
              d="
              M 0 0 
              L 1 0 
              L 1 0.55
              L 0.55 0.88
              Q 0.40 0.98 0.25 0.88
              L 0 0.75
              Z
            "
            />
          </clipPath>
        </defs>
      </svg>

      {/* IMAGE CONTAINER */}
      <div className="w-full h-full overflow-hidden relative z-10">
        
        {/* ✅ Mobile = rectangle | Desktop = clipped */}
        <div className="w-full h-full md:[clip-path:url(#Triangle)]">
          
          <motion.img
            key={theme.image}
            src={theme.image}
            className="w-full z-10 relative h-full object-cover"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Gradient */}
          <div
            className={`absolute inset-0 z-20 bg-gradient-to-br ${theme.gradient}`}
          />

          {/* ✅ MOBILE TEXT: Adjusted to bottom-left */}
          <div className="absolute inset-0 flex flex-col items-start justify-end p-8 text-white md:hidden z-30">
            <p className="text-sm tracking-widest">{year}</p>
            <h2 className="text-3xl font-bold uppercase">{monthName}</h2>
          </div>
        </div>
      </div>

      {/* LEFT ACCENT */}
      <div
        className="hidden md:block absolute z-0 bottom-4 left-0 w-32 h-32 rotate-90"
        style={{
          backgroundColor: theme.accent,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
      />

      {/* RIGHT ACCENT */}
      <div
        className="hidden md:flex z-0 overflow-hidden absolute bottom-0 -right-35 w-4/6 h-[400px] items-end justify-center p-4 text-white"
        style={{
          clipPath: "url(#Triangle)",
          backgroundColor: theme.accent,
        }}
      >
        <div className="text-right pr-20 pb-12">
          <p className="text-sm tracking-widest">{year}</p>
          <h2 className="text-2xl font-bold uppercase">{monthName}</h2>
        </div>
      </div>
    </div>
  );
}