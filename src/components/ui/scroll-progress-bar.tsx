"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface ScrollProgressBarProps {
  className?: string;
  barClassName?: string;
}

export default function ScrollProgressBar({
  className,
  barClassName,
}: ScrollProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;

      const bar = barRef.current;
      if (!bar) {
        return;
      }

      const scrollRoot = document.documentElement;
      const scrollableHeight =
        scrollRoot.scrollHeight - window.innerHeight;
      const rawProgress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      bar.style.transform = `scaleX(${clampedProgress})`;
    };

    const queueUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    queueUpdate();

    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-white/[0.06] backdrop-blur-[2px]",
        className
      )}
    >
      <div
        ref={barRef}
        className={cn(
          "h-full origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.92),rgba(125,211,252,0.95),rgba(255,255,255,0.98))] shadow-[0_0_18px_rgba(103,232,249,0.45)] will-change-transform",
          barClassName
        )}
      />
    </div>
  );
}
