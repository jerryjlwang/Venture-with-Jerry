import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  keepCursorAfterComplete?: boolean;
}

const TypewriterText = ({ text, speed = 50, className = '', onComplete, keepCursorAfterComplete = false }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={`inline-grid ${className}`}>
      {/* Ghost text reserves the final layout; both spans occupy the same grid cell */}
      <span className="opacity-0 [grid-area:1/1] whitespace-pre-wrap" aria-hidden="true">
        {text}
      </span>
      <span className="[grid-area:1/1] whitespace-pre-wrap">
        {displayedText}
        {(currentIndex < text.length || keepCursorAfterComplete) && (
          <span className="animate-blink">|</span>
        )}
      </span>
    </span>
  );
};

export default TypewriterText;
