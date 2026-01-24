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
    <span className={`relative inline-block ${className}`}>
      {/* Full text to establish width - invisible but takes space */}
      <span className="invisible">{text}</span>
      {/* Typed text overlaid on top */}
      <span className="absolute left-0 top-0">
        {displayedText}
        {(currentIndex < text.length || keepCursorAfterComplete) && (
          <span className="animate-blink">|</span>
        )}
      </span>
    </span>
  );
};

export default TypewriterText;
