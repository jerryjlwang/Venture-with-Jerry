// Decorative golf course hazards - water and bunkers with organic shapes

interface HazardProps {
  className?: string;
}

// Water hazard blob shapes - blue with organic curves
export const WaterHazard = ({ className = "" }: HazardProps) => (
  <svg 
    viewBox="0 0 200 120" 
    className={`pointer-events-none ${className}`}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#0284c7" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
      </linearGradient>
      <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M 20,60 C 5,40 15,10 50,8 C 90,5 120,15 150,10 C 180,8 195,30 190,55 C 188,80 170,100 130,105 C 90,112 50,100 30,95 C 10,90 5,75 20,60 Z"
      fill="url(#waterGradient)"
      filter="url(#waterGlow)"
    />
    {/* Subtle wave lines */}
    <path
      d="M 40,50 Q 70,45 100,52 Q 130,58 160,50"
      fill="none"
      stroke="rgba(255,255,255,0.15)"
      strokeWidth="1.5"
    />
    <path
      d="M 50,70 Q 80,65 110,72 Q 140,78 170,70"
      fill="none"
      stroke="rgba(255,255,255,0.1)"
      strokeWidth="1"
    />
  </svg>
);

// Alternative water shape - more elongated
export const WaterHazard2 = ({ className = "" }: HazardProps) => (
  <svg 
    viewBox="0 0 180 100" 
    className={`pointer-events-none ${className}`}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="waterGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.45" />
      </linearGradient>
    </defs>
    <path
      d="M 15,50 C 5,25 25,5 60,8 C 100,5 140,15 165,25 C 185,40 180,70 155,85 C 120,100 70,95 35,85 C 10,75 5,65 15,50 Z"
      fill="url(#waterGradient2)"
    />
    <path
      d="M 35,45 Q 80,38 130,48"
      fill="none"
      stroke="rgba(255,255,255,0.12)"
      strokeWidth="1.5"
    />
  </svg>
);

// Kidney-shaped water
export const WaterHazard3 = ({ className = "" }: HazardProps) => (
  <svg 
    viewBox="0 0 150 100" 
    className={`pointer-events-none ${className}`}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="waterGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <path
      d="M 25,50 C 10,25 30,5 65,10 C 100,8 130,25 140,50 C 145,75 120,95 80,92 C 45,95 20,80 25,50 Z"
      fill="url(#waterGradient3)"
    />
  </svg>
);

// Bunker blob shapes - sandy beige with organic curves
export const Bunker = ({ className = "" }: HazardProps) => (
  <svg 
    viewBox="0 0 160 100" 
    className={`pointer-events-none ${className}`}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="bunkerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
        <stop offset="50%" stopColor="#d97706" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#b45309" stopOpacity="0.35" />
      </linearGradient>
      <filter id="bunkerTexture" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
      </filter>
    </defs>
    <path
      d="M 20,50 C 8,25 25,8 55,10 C 90,5 125,15 145,35 C 155,55 145,80 115,90 C 75,98 35,92 18,75 C 5,60 10,55 20,50 Z"
      fill="url(#bunkerGradient)"
    />
    {/* Sand texture lines */}
    <path
      d="M 35,40 Q 75,35 115,45"
      fill="none"
      stroke="rgba(255,255,255,0.1)"
      strokeWidth="1"
    />
    <path
      d="M 40,60 Q 80,55 120,65"
      fill="none"
      stroke="rgba(139,69,19,0.15)"
      strokeWidth="1"
    />
  </svg>
);

// Alternative bunker - more circular
export const Bunker2 = ({ className = "" }: HazardProps) => (
  <svg 
    viewBox="0 0 120 100" 
    className={`pointer-events-none ${className}`}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="bunkerGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <path
      d="M 25,50 C 15,20 35,5 60,8 C 90,5 110,25 108,55 C 105,85 80,98 50,95 C 20,92 10,70 25,50 Z"
      fill="url(#bunkerGradient2)"
    />
  </svg>
);

// Pot bunker - small and deep looking
export const Bunker3 = ({ className = "" }: HazardProps) => (
  <svg 
    viewBox="0 0 100 80" 
    className={`pointer-events-none ${className}`}
    preserveAspectRatio="none"
  >
    <defs>
      <radialGradient id="bunkerGradient3" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#92400e" stopOpacity="0.35" />
      </radialGradient>
    </defs>
    <path
      d="M 20,40 C 10,20 30,5 50,8 C 75,5 90,22 88,45 C 85,70 65,78 45,75 C 22,72 8,55 20,40 Z"
      fill="url(#bunkerGradient3)"
    />
  </svg>
);

// Course decoration positions - scattered around the journey
export const CourseDecorations = () => (
  <>
    {/* Water hazards - left side */}
    <WaterHazard className="absolute left-0 top-[5%] w-48 h-28 opacity-60" />
    <WaterHazard2 className="absolute left-[5%] top-[25%] w-40 h-24 opacity-50 rotate-12" />
    <WaterHazard3 className="absolute left-0 top-[55%] w-36 h-24 opacity-55 -rotate-6" />
    <WaterHazard className="absolute left-[3%] top-[80%] w-44 h-26 opacity-50 rotate-6" />
    
    {/* Water hazards - right side */}
    <WaterHazard2 className="absolute right-0 top-[15%] w-44 h-28 opacity-55 -rotate-12" />
    <WaterHazard className="absolute right-[2%] top-[40%] w-40 h-24 opacity-50 rotate-3" />
    <WaterHazard3 className="absolute right-0 top-[65%] w-48 h-28 opacity-55 -rotate-8" />
    <WaterHazard2 className="absolute right-[5%] top-[90%] w-36 h-22 opacity-50 rotate-15" />
    
    {/* Bunkers - left side */}
    <Bunker className="absolute left-[8%] top-[12%] w-32 h-20 opacity-50 rotate-6" />
    <Bunker2 className="absolute left-[2%] top-[35%] w-28 h-20 opacity-45 -rotate-10" />
    <Bunker3 className="absolute left-[6%] top-[48%] w-24 h-18 opacity-50 rotate-15" />
    <Bunker className="absolute left-[4%] top-[70%] w-30 h-20 opacity-45 -rotate-5" />
    <Bunker2 className="absolute left-[10%] top-[88%] w-26 h-18 opacity-50 rotate-8" />
    
    {/* Bunkers - right side */}
    <Bunker2 className="absolute right-[6%] top-[8%] w-28 h-18 opacity-45 -rotate-8" />
    <Bunker className="absolute right-[3%] top-[28%] w-32 h-20 opacity-50 rotate-10" />
    <Bunker3 className="absolute right-[8%] top-[52%] w-24 h-18 opacity-45 -rotate-12" />
    <Bunker className="absolute right-[2%] top-[75%] w-30 h-20 opacity-50 rotate-5" />
    <Bunker2 className="absolute right-[7%] top-[95%] w-28 h-18 opacity-45 -rotate-6" />
  </>
);

export default CourseDecorations;
