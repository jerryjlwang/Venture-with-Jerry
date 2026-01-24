import { useEffect, useMemo, useRef, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  keepCursorAfterComplete?: boolean;
}

const TypewriterText = ({ text, speed = 50, className = '', onComplete, keepCursorAfterComplete = false }: TypewriterTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasCompletedRef = useRef(false);

  // If the text changes, restart the animation.
  useEffect(() => {
    setCurrentIndex(0);
    hasCompletedRef.current = false;
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }

    if (!hasCompletedRef.current && currentIndex >= text.length) {
      hasCompletedRef.current = true;
      onComplete?.();
    }
  }, [currentIndex, text.length, speed, onComplete]);

  const { visible, hidden, layoutHidden, cursorActive } = useMemo(() => {
    const clamped = Math.max(0, Math.min(currentIndex, text.length));
    const cursorOn = clamped < text.length || keepCursorAfterComplete;

    const hiddenText = text.slice(clamped);
    // Keep the overall layout width stable:
    // - If we are showing a cursor while typing, let the cursor take the width of the NEXT character
    //   by removing that first hidden character from the invisible layout text.
    // - If keepCursorAfterComplete is true, the cursor is part of the final layout, so don't remove anything.
    const layoutHiddenText = keepCursorAfterComplete
      ? hiddenText
      : cursorOn
        ? hiddenText.slice(1)
        : hiddenText;

    return {
      visible: text.slice(0, clamped),
      hidden: hiddenText,
      layoutHidden: layoutHiddenText,
      cursorActive: cursorOn
    };
  }, [currentIndex, text, keepCursorAfterComplete]);

  return (
    <span className={`inline-block whitespace-pre-wrap ${className}`}>
      {/*
        Why it “typed from the center”:
        when the parent is text-center (or text-right), concatenating characters changes the element width every tick,
        so the browser re-centers it continuously.

        Fix: render the full string's width at all times (hidden part keeps layout), and only reveal characters.
      */}
      <span>{visible}</span>
      {cursorActive && (
        <span className="animate-blink">|</span>
      )}
      <span className="opacity-0" aria-hidden="true">
        {layoutHidden}
      </span>
    </span>
  );
};

export default TypewriterText;
