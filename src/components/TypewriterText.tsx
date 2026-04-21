import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  keepCursorAfterComplete?: boolean;
}

const TypewriterText = ({
  text,
  speed = 50,
  className = '',
  onComplete,
  keepCursorAfterComplete = false,
}: TypewriterTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasCompletedRef = useRef(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const chars = useMemo(() => Array.from(text), [text]);

  // Capture the real inherited text color once and store it as a CSS variable
  // so the ::before cursor can use it even though each char span is color:transparent.
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const color = getComputedStyle(containerRef.current).color;
    containerRef.current.style.setProperty('--tw-cursor', color);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    hasCompletedRef.current = false;
  }, [text]);

  useEffect(() => {
    if (currentIndex < chars.length) {
      const timeout = setTimeout(() => setCurrentIndex(prev => prev + 1), speed);
      return () => clearTimeout(timeout);
    }
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete?.();
    }
  }, [currentIndex, chars.length, speed, onComplete]);

  const done = currentIndex >= chars.length;
  const cursorActive = !done || keepCursorAfterComplete;

  return (
    <span ref={containerRef} className={className}>
      {chars.map((char, i) => {
        const revealed = i < currentIndex;
        // The cursor class renders a ::before pseudo-element that is position:absolute,
        // keeping it entirely out of the inline flow so it cannot create soft-wrap
        // opportunities that would cause words to jump between lines.
        const isCursorHere = cursorActive && !done && i === currentIndex;
        return (
          <span
            key={i}
            style={{ color: revealed ? undefined : 'transparent' }}
            className={isCursorHere ? 'typewriter-cursor' : undefined}
          >
            {char}
          </span>
        );
      })}
      {/* End-of-text cursor: zero-width space keeps it off-layout while the
          ::before still renders at the correct line position. */}
      {done && keepCursorAfterComplete && (
        <span
          className="typewriter-cursor"
          style={{ color: 'transparent' }}
          aria-hidden="true"
        >{'\u200b'}</span>
      )}
    </span>
  );
};

export default TypewriterText;
