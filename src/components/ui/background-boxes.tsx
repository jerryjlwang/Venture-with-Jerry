import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = [
  "rgb(125 211 252)",
  "rgb(249 168 212)",
  "rgb(134 239 172)",
  "rgb(253 224 71)",
  "rgb(252 165 165)",
  "rgb(216 180 254)",
  "rgb(147 197 253)",
  "rgb(165 180 252)",
  "rgb(196 181 253)",
];

export const BoxesCore = ({
  className,
  rows = 18,
  cols = 14,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  rows?: number;
  cols?: number;
}) => {
  const rowIndices = useMemo(() => Array.from({ length: rows }, (_, i) => i), [rows]);
  const colIndices = useMemo(() => Array.from({ length: cols }, (_, i) => i), [cols]);

  // Deterministic per-cell hover color chosen at mount time. Avoids the
  // expensive framer-motion per-tile mount and CSS variable means hover
  // updates cost zero JS.
  const paletteFor = (r: number, c: number) =>
    DEFAULT_COLORS[(r * 7 + c * 3) % DEFAULT_COLORS.length];

  return (
    <div
      style={{
        transform:
          "translate3d(-50%, -50%, 0) skewX(-48deg) skewY(14deg) scale(0.675)",
        transformOrigin: "center",
      }}
      className={cn("absolute left-1/2 top-1/2 z-0 flex p-4", className)}
      {...rest}
    >
      {rowIndices.map((rowIndex) => (
        <div
          key={`row${rowIndex}`}
          className="relative flex w-16 shrink-0 flex-col border-l border-slate-700"
        >
          {colIndices.map((colIndex) => {
            const showPlus = colIndex % 2 === 0 && rowIndex % 2 === 0;
            return (
              <div
                key={`col${colIndex}`}
                className="bg-box relative h-8 w-16 border-r border-t border-slate-700 transition-colors duration-0 hover:duration-0"
                style={{ ["--box-hover" as string]: paletteFor(rowIndex, colIndex) }}
              >
                {showPlus ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 stroke-[1px] text-slate-700"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
