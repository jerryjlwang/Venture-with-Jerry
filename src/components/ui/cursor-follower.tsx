'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR =
  "a, button, img, input, textarea, select, summary, [role='button'], [data-cursor='interactive']";

const DOT_SMOOTHNESS = 0.2;
const BORDER_DOT_SMOOTHNESS = 0.1;
const SETTLE_EPSILON = 0.05;

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

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    setIsEnabled(true);

    let hasMovedLocal = false;

    const startAnimation = () => {
      if (frameRef.current !== null) return;

      const step = () => {
        const dx = mousePosition.current.x - dotPosition.current.x;
        const dy = mousePosition.current.y - dotPosition.current.y;
        const bx = mousePosition.current.x - borderDotPosition.current.x;
        const by = mousePosition.current.y - borderDotPosition.current.y;

        dotPosition.current.x += dx * DOT_SMOOTHNESS;
        dotPosition.current.y += dy * DOT_SMOOTHNESS;
        borderDotPosition.current.x += bx * BORDER_DOT_SMOOTHNESS;
        borderDotPosition.current.y += by * BORDER_DOT_SMOOTHNESS;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dotPosition.current.x}px, ${dotPosition.current.y}px, 0) translate(-50%, -50%)`;
        }
        if (borderRef.current) {
          borderRef.current.style.transform = `translate3d(${borderDotPosition.current.x}px, ${borderDotPosition.current.y}px, 0) translate(-50%, -50%)`;
        }

        // Stop the rAF loop once the cursor has caught up to the target.
        // Will restart on the next mousemove.
        const settled =
          Math.abs(dx) < SETTLE_EPSILON &&
          Math.abs(dy) < SETTLE_EPSILON &&
          Math.abs(bx) < SETTLE_EPSILON &&
          Math.abs(by) < SETTLE_EPSILON;

        if (settled) {
          frameRef.current = null;
          return;
        }
        frameRef.current = requestAnimationFrame(step);
      };

      frameRef.current = requestAnimationFrame(step);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;
      if (!hasMovedLocal) {
        hasMovedLocal = true;
        setHasMoved(true);
      }
      startAnimation();
    };

    const handlePointerOver = (e: Event) => {
      const target = e.target;
      if (target instanceof Element && target.closest(INTERACTIVE_SELECTOR)) {
        setIsHovering(true);
      }
    };

    const handlePointerOut = (e: Event) => {
      const target = e.target;
      const relatedTarget = e instanceof MouseEvent ? e.relatedTarget : null;
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseout', handlePointerOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-200 ${hasMoved ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        ref={dotRef}
        className="absolute rounded-full bg-white"
        style={{
          width: '8px',
          height: '8px',
          transform: 'translate3d(0px, 0px, 0) translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      <div
        ref={borderRef}
        className="absolute rounded-full border border-white"
        style={{
          width: isHovering ? '44px' : '28px',
          height: isHovering ? '44px' : '28px',
          transform: 'translate3d(0px, 0px, 0) translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s',
          willChange: 'transform, width, height',
        }}
      />
    </div>
  );
};

export { CursorFollower as Component };
