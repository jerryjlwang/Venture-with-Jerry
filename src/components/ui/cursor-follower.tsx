'use client';

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, img, input, textarea, select, summary, [role='button'], [data-cursor='interactive']";

export const CursorFollower = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const borderDotPosition = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const hasMovedRef = useRef(false);

  const DOT_SMOOTHNESS = 0.2;
  const BORDER_DOT_SMOOTHNESS = 0.1;

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setHasMoved(true);
      }
    };

    const handlePointerOver = (e: Event) => {
      const target = e.target;
      if (target instanceof Element && target.closest(INTERACTIVE_SELECTOR)) {
        setIsHovering(true);
      }
    };

    const handlePointerOut = (e: Event) => {
      const target = e.target;
      const relatedTarget =
        e instanceof MouseEvent ? e.relatedTarget : null;

      const leftInteractive =
        target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
      const enteredInteractive =
        relatedTarget instanceof Element
          ? relatedTarget.closest(INTERACTIVE_SELECTOR)
          : null;

      if (leftInteractive && !enteredInteractive) {
        setIsHovering(false);
      }
    };

    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      dotPosition.current.x = lerp(
        dotPosition.current.x,
        mousePosition.current.x,
        DOT_SMOOTHNESS
      );
      dotPosition.current.y = lerp(
        dotPosition.current.y,
        mousePosition.current.y,
        DOT_SMOOTHNESS
      );

      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS
      );
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS
      );

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPosition.current.x}px, ${dotPosition.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (borderRef.current) {
        borderRef.current.style.transform = `translate3d(${borderDotPosition.current.x}px, ${borderDotPosition.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handlePointerOver);
    document.addEventListener("mouseout", handlePointerOut);

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handlePointerOver);
      document.removeEventListener("mouseout", handlePointerOut);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-200 ${hasMoved ? "opacity-100" : "opacity-0"}`}
    >
      <div
        ref={dotRef}
        className="absolute rounded-full bg-white"
        style={{
          width: "8px",
          height: "8px",
          transform: "translate3d(0px, 0px, 0) translate(-50%, -50%)",
          willChange: "transform",
        }}
      />

      <div
        ref={borderRef}
        className="absolute rounded-full border border-white"
        style={{
          width: isHovering ? "44px" : "28px",
          height: isHovering ? "44px" : "28px",
          transform: "translate3d(0px, 0px, 0) translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s",
          willChange: "transform, width, height",
        }}
      />
    </div>
  );
};

export { CursorFollower as Component };
