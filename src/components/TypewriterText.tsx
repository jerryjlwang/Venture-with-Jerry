import { useEffect, useLayoutEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  keepCursorAfterComplete?: boolean;
}

// Types characters by moving a single DOM cursor marker through pre-rendered
// spans. Avoids re-rendering the React tree for every character (old version
// caused N commits + N effect teardowns per typewriter run) and avoids layout
// shifts because every glyph is mounted up-front at final width.
const TypewriterText = ({
  text,
  speed = 50,
  className = '',
  onComplete,
  keepCursorAfterComplete = false,
}: TypewriterTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Capture inherited color once so the ::before cursor can inherit it even
  // though each char span is color: transparent until revealed.
  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    node.style.setProperty('--tw-cursor', getComputedStyle(node).color);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(container.querySelectorAll<HTMLElement>('[data-ch]'));
    chars.forEach((el) => {
      el.style.color = 'transparent';
      el.classList.remove('typewriter-cursor');
    });

    let index = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      if (index > 0) {
        const prev = chars[index - 1];
        if (prev) prev.classList.remove('typewriter-cursor');
      }
      if (index < chars.length) {
        const current = chars[index];
        if (current) {
          current.style.color = '';
          current.classList.add('typewriter-cursor');
        }
        index += 1;
        timer = window.setTimeout(tick, speed);
      } else {
        const tail = container.querySelector<HTMLElement>('[data-cursor-tail]');
        if (keepCursorAfterComplete && tail) {
          tail.classList.add('typewriter-cursor');
        }
        onCompleteRef.current?.();
      }
    };

    let timer = window.setTimeout(tick, speed);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [text, speed, keepCursorAfterComplete]);

  const chars = Array.from(text);

  return (
    <span ref={containerRef} className={className}>
      {chars.map((char, i) => (
        <span key={i} data-ch style={{ color: 'transparent' }}>
          {char}
        </span>
      ))}
      {keepCursorAfterComplete && (
        <span data-cursor-tail style={{ color: 'transparent' }} aria-hidden="true">
          {'​'}
        </span>
      )}
    </span>
  );
};

export default TypewriterText;
