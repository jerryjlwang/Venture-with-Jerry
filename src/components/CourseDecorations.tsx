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
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
    </defs>
    <path
      d="M 20,60 C 5,40 15,10 50,8 C 90,5 120,15 150,10 C 180,8 195,30 190,55 C 188,80 170,100 130,105 C 90,112 50,100 30,95 C 10,90 5,75 20,60 Z"
      fill="url(#waterGradient)"
    />
    {/* Subtle wave lines */}
    <path
      d="M 40,50 Q 70,45 100,52 Q 130,58 160,50"
      fill="none"
      stroke="rgba(255,255,255,0.25)"
      strokeWidth="2"
    />
    <path
      d="M 50,70 Q 80,65 110,72 Q 140,78 170,70"
      fill="none"
      stroke="rgba(255,255,255,0.2)"
      strokeWidth="1.5"
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
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    <path
      d="M 15,50 C 5,25 25,5 60,8 C 100,5 140,15 165,25 C 185,40 180,70 155,85 C 120,100 70,95 35,85 C 10,75 5,65 15,50 Z"
      fill="url(#waterGradient2)"
    />
    <path
      d="M 35,45 Q 80,38 130,48"
      fill="none"
      stroke="rgba(255,255,255,0.2)"
      strokeWidth="2"
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
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#0369a1" />
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
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <path
      d="M 20,50 C 8,25 25,8 55,10 C 90,5 125,15 145,35 C 155,55 145,80 115,90 C 75,98 35,92 18,75 C 5,60 10,55 20,50 Z"
      fill="url(#bunkerGradient)"
    />
    {/* Sand texture lines */}
    <path
      d="M 35,40 Q 75,35 115,45"
      fill="none"
      stroke="rgba(255,255,255,0.15)"
      strokeWidth="1.5"
    />
    <path
      d="M 40,60 Q 80,55 120,65"
      fill="none"
      stroke="rgba(139,69,19,0.2)"
      strokeWidth="1.5"
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
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#d97706" />
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
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#b45309" />
      </radialGradient>
    </defs>
    <path
      d="M 20,40 C 10,20 30,5 50,8 C 75,5 90,22 88,45 C 85,70 65,78 45,75 C 22,72 8,55 20,40 Z"
      fill="url(#bunkerGradient3)"
    />
  </svg>
);

// Grass patch - organic tuft shape
export const Grass = ({ className = "" }: HazardProps) => (
  <svg 
    viewBox="0 0 200 140" 
    className={`pointer-events-none ${className}`}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="grassGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="50%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>
    <path
      d="M 15,70 C 5,45 20,15 55,12 C 95,8 130,18 160,15 C 190,12 198,45 192,75 C 188,105 165,125 120,128 C 75,132 40,120 22,105 C 5,90 5,80 15,70 Z"
      fill="url(#grassGradient1)"
    />
    {/* Grass texture lines */}
    <path
      d="M 40,55 Q 80,48 130,58"
      fill="none"
      stroke="rgba(34,197,94,0.4)"
      strokeWidth="2"
    />
    <path
      d="M 50,85 Q 100,78 150,88"
      fill="none"
      stroke="rgba(21,128,61,0.3)"
      strokeWidth="1.5"
    />
  </svg>
);

// Grass patch 2 - rounder shape
export const Grass2 = ({ className = "" }: HazardProps) => (
  <svg 
    viewBox="0 0 160 120" 
    className={`pointer-events-none ${className}`}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="grassGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <path
      d="M 20,60 C 8,30 30,8 65,10 C 105,8 140,25 150,55 C 158,85 135,110 90,112 C 45,115 15,95 20,60 Z"
      fill="url(#grassGradient2)"
    />
    <path
      d="M 40,50 Q 85,42 130,55"
      fill="none"
      stroke="rgba(74,222,128,0.35)"
      strokeWidth="2"
    />
  </svg>
);

// Grass patch 3 - elongated fairway-like
export const Grass3 = ({ className = "" }: HazardProps) => (
  <svg 
    viewBox="0 0 180 100" 
    className={`pointer-events-none ${className}`}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="grassGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>
    <path
      d="M 12,50 C 5,25 25,5 65,8 C 110,5 150,20 170,45 C 180,70 160,92 115,95 C 65,100 25,88 12,65 C 5,55 5,55 12,50 Z"
      fill="url(#grassGradient3)"
    />
  </svg>
);

// Course decoration positions - water, bunkers, and grass in separate areas
export const CourseDecorations = () => (
  <>
    {/* Water hazards - left side (lower positions) */}
    <WaterHazard className="absolute -left-10 top-[2%] w-72 h-44" />
    <WaterHazard2 className="absolute left-0 top-[22%] w-64 h-40 rotate-12" />
    <WaterHazard3 className="absolute -left-8 top-[48%] w-56 h-36 -rotate-6" />
    <WaterHazard className="absolute left-0 top-[72%] w-68 h-42 rotate-6" />
    <WaterHazard2 className="absolute -left-5 top-[92%] w-60 h-38 -rotate-10" />
    
    {/* Water hazards - right side (lower positions) */}
    <WaterHazard2 className="absolute -right-10 top-[12%] w-68 h-44 -rotate-12" />
    <WaterHazard className="absolute right-0 top-[38%] w-64 h-40 rotate-3" />
    <WaterHazard3 className="absolute -right-8 top-[62%] w-72 h-44 -rotate-8" />
    <WaterHazard2 className="absolute right-0 top-[85%] w-56 h-36 rotate-15" />
    
    {/* Bunkers - left side (offset from water) */}
    <Bunker className="absolute left-[8%] top-[12%] w-52 h-32 rotate-6" />
    <Bunker2 className="absolute left-[5%] top-[35%] w-44 h-32 -rotate-10" />
    <Bunker3 className="absolute left-[10%] top-[58%] w-40 h-28 rotate-15" />
    <Bunker className="absolute left-[6%] top-[82%] w-48 h-32 -rotate-5" />
    
    {/* Bunkers - right side (offset from water) */}
    <Bunker2 className="absolute right-[10%] top-[2%] w-48 h-32 -rotate-8" />
    <Bunker className="absolute right-[6%] top-[25%] w-52 h-34 rotate-10" />
    <Bunker3 className="absolute right-[8%] top-[50%] w-40 h-28 -rotate-12" />
    <Bunker className="absolute right-[5%] top-[72%] w-48 h-32 rotate-5" />
    <Bunker2 className="absolute right-[10%] top-[95%] w-44 h-30 -rotate-6" />
    
    {/* Grass patches - left side (between water and bunkers) */}
    <Grass className="absolute left-[15%] top-[5%] w-64 h-44 rotate-3" />
    <Grass2 className="absolute left-[12%] top-[28%] w-56 h-40 -rotate-8" />
    <Grass3 className="absolute left-[18%] top-[45%] w-60 h-36 rotate-12" />
    <Grass className="absolute left-[14%] top-[68%] w-52 h-38 -rotate-4" />
    <Grass2 className="absolute left-[16%] top-[88%] w-48 h-34 rotate-6" />
    
    {/* Grass patches - right side (between water and bunkers) */}
    <Grass2 className="absolute right-[18%] top-[8%] w-56 h-38 -rotate-6" />
    <Grass3 className="absolute right-[14%] top-[32%] w-64 h-42 rotate-8" />
    <Grass className="absolute right-[16%] top-[55%] w-52 h-36 -rotate-10" />
    <Grass2 className="absolute right-[12%] top-[78%] w-60 h-40 rotate-4" />
    <Grass3 className="absolute right-[18%] top-[92%] w-48 h-32 -rotate-8" />
  </>
);

export default CourseDecorations;
