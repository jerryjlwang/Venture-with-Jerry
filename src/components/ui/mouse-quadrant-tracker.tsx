'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';

interface MouseQuadrantTrackerProps {
  text: string;
  hue?: number;
  fontSize?: string;
  shadowIntensity?: number;
  layerCount?: number;
  textColor?: string;
  textGradient?: string;
  className?: string;
  containerClassName?: string;
  minHeight?: string;
  padding?: string;
}

export function MouseQuadrantTracker({
  text,
  hue = 200,
  fontSize = '25vmax',
  shadowIntensity = 10,
  layerCount,
  textColor,
  textGradient,
  className,
  containerClassName,
  minHeight = '100vh',
  padding = '5vmin',
}: MouseQuadrantTrackerProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h1 = h1Ref.current;
    if (!h1) return;

    let lastX = 1;
    let lastY = 1;

    const handleMouseMove = (event: MouseEvent) => {
      const { x, y, width, height } = h1.getBoundingClientRect();
      const nextX = event.clientX - (x + 0.5 * width) >= 0 ? 1 : -1;
      const nextY = event.clientY - (y + 0.5 * height) >= 0 ? 1 : -1;
      if (nextX === lastX && nextY === lastY) return;
      lastX = nextX;
      lastY = nextY;
      h1.style.setProperty('--x-quadrant', `${nextX}`);
      h1.style.setProperty('--y-quadrant', `${nextY}`);
    };

    h1.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => h1.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const hasGradient = Boolean(textGradient);
  const baseLayerLevels = hasGradient
    ? [
        { distance: 1, lightness: 86, alpha: 0.9 },
        { distance: 2, lightness: 74, alpha: 0.82 },
        { distance: 3, lightness: 62, alpha: 0.74 },
        { distance: 4, lightness: 50, alpha: 0.66 },
      ]
    : [
        { distance: 1, lightness: 75, alpha: 1 },
        { distance: 2, lightness: 65, alpha: 1 },
        { distance: 3, lightness: 55, alpha: 1 },
        { distance: 4, lightness: 45, alpha: 1 },
        { distance: 5, lightness: 35, alpha: 1 },
      ];
  const layerLevels = baseLayerLevels.slice(0, layerCount ?? baseLayerLevels.length);

  return (
    <div
      className={containerClassName}
      style={
        {
          minHeight,
          minWidth: '100%',
          margin: 0,
          padding,
          boxSizing: 'border-box',
          display: 'grid',
          placeItems: 'center',
          '--hue': hue.toString(),
          '--x-quadrant': '1',
          '--y-quadrant': '1',
        } as React.CSSProperties
      }
    >
      <h1
        className={className}
        ref={h1Ref}
        style={
          {
            textTransform: 'uppercase',
            fontSize,
            margin: 0,
            lineHeight: '0.8em',
            inlineSize: 'min-content',
            display: 'inline-grid',
          } as React.CSSProperties
        }
      >
        {layerLevels.map((layer) => (
          <span
            key={layer.distance}
            aria-hidden="true"
            style={
              {
                gridArea: '1 / 1',
                color: `hsl(${hue} 100% ${layer.lightness}% / ${layer.alpha})`,
                transform: `translate(calc(var(--x-quadrant) * ${shadowIntensity * layer.distance}px), calc(var(--y-quadrant) * ${shadowIntensity * layer.distance}px))`,
                transition: 'transform 0.2s ease',
                pointerEvents: 'none',
                userSelect: 'none',
              } as React.CSSProperties
            }
          >
            {text}
          </span>
        ))}
        <span
          style={
            {
              gridArea: '1 / 1',
              position: 'relative',
              color: hasGradient ? 'transparent' : textColor || `hsl(${hue} 90% 90%)`,
              backgroundImage: textGradient,
              WebkitBackgroundClip: hasGradient ? 'text' : undefined,
              backgroundClip: hasGradient ? 'text' : undefined,
              WebkitTextFillColor: hasGradient ? 'transparent' : undefined,
            } as React.CSSProperties
          }
        >
          {text}
        </span>
      </h1>
    </div>
  );
}
