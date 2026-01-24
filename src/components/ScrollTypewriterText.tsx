import { useState, useEffect, useRef } from 'react';
import TypewriterText from './TypewriterText';

interface ScrollTypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  keepCursorAfterComplete?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const ScrollTypewriterText = ({ 
  text, 
  speed = 50, 
  className = '', 
  onComplete,
  keepCursorAfterComplete = false,
  as: Component = 'span'
}: ScrollTypewriterTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <Component ref={ref as any} className={className}>
      {isVisible ? (
        <TypewriterText 
          text={text} 
          speed={speed} 
          onComplete={onComplete}
          keepCursorAfterComplete={keepCursorAfterComplete}
        />
      ) : (
        <span className="invisible">{text}</span>
      )}
    </Component>
  );
};

export default ScrollTypewriterText;
