import { useEffect, useRef } from "react";

import { useTerminalTheme } from "@/hooks/useTerminalTheme";

type ParticleFieldProps = {
  density?: number;
  className?: string;
};

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

const OFFSCREEN = -9999;
const LINK_DISTANCE = 150;
const MOUSE_DISTANCE = 200;
const CELL_SIZE = LINK_DISTANCE;
const FRAME_INTERVAL = 1000 / 30;
const BASE_FRAME_INTERVAL = 1000 / 60;

const PALETTES = {
  dark: {
    backgroundStart: "#000000",
    backgroundMiddle: "#05070a",
    backgroundEnd: "#000000",
    vignette: "rgba(0,150,199,0.06)",
    vignetteEnd: "rgba(0,0,0,0)",
    dot: "rgba(0,245,255,0.75)",
    link: "0,217,255",
    mouseLink: "103,232,249",
  },
  light: {
    backgroundStart: "#f7fbfa",
    backgroundMiddle: "#dfecea",
    backgroundEnd: "#edf6f4",
    vignette: "rgba(0,127,143,0.11)",
    vignetteEnd: "rgba(237,246,244,0)",
    dot: "rgba(0,111,125,0.62)",
    link: "0,127,143",
    mouseLink: "0,107,120",
  },
} as const;

export default function ParticleField({
  density = 0.0001,
  className = "block h-full w-full",
}: ParticleFieldProps) {
  const { theme } = useTerminalTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const tracksPointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const mouse = { x: OFFSCREEN, y: OFFSCREEN };
    const palette = PALETTES[theme];
    let dots: Dot[] = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let lastFrameTime = 0;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.max(
        34,
        Math.min(Math.floor(width * height * density), 150)
      );

      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: 0.8 + Math.random() * 1.8,
      }));
    };

    const scheduleFrame = () => {
      if (!reducedMotion && !document.hidden && animationFrame === 0) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const draw = (frameTime: number) => {
      animationFrame = 0;

      if (
        lastFrameTime !== 0 &&
        frameTime - lastFrameTime < FRAME_INTERVAL
      ) {
        scheduleFrame();
        return;
      }

      const frameScale =
        lastFrameTime === 0
          ? 1
          : Math.min(
              (frameTime - lastFrameTime) / BASE_FRAME_INTERVAL,
              2.5
            );
      lastFrameTime = frameTime;
      const background = context.createLinearGradient(0, 0, 0, height);

      background.addColorStop(0, palette.backgroundStart);
      background.addColorStop(0.5, palette.backgroundMiddle);
      background.addColorStop(1, palette.backgroundEnd);
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      const vignette = context.createRadialGradient(
        width / 2,
        height * 0.35,
        0,
        width / 2,
        height * 0.35,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, palette.vignette);
      vignette.addColorStop(1, palette.vignetteEnd);
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      const grid = new Map<number, number[]>();

      for (let index = 0; index < dots.length; index += 1) {
        const dot = dots[index];

        if (!reducedMotion) {
          dot.x += dot.vx * frameScale;
          dot.y += dot.vy * frameScale;

          if (dot.x < 0 || dot.x > width) {
            dot.vx *= -1;
          }
          if (dot.y < 0 || dot.y > height) {
            dot.vy *= -1;
          }
        }

        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        context.fillStyle = palette.dot;
        context.fill();

        const cellX = Math.floor(dot.x / CELL_SIZE);
        const cellY = Math.floor(dot.y / CELL_SIZE);
        const cellKey = cellX + cellY * 10000;
        const cell = grid.get(cellKey);

        if (cell) {
          cell.push(index);
        } else {
          grid.set(cellKey, [index]);
        }
      }

      for (let index = 0; index < dots.length; index += 1) {
        const dot = dots[index];
        const cellX = Math.floor(dot.x / CELL_SIZE);
        const cellY = Math.floor(dot.y / CELL_SIZE);

        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
            const nearby = grid.get(
              cellX + offsetX + (cellY + offsetY) * 10000
            );

            if (!nearby) {
              continue;
            }

            for (const comparisonIndex of nearby) {
              if (comparisonIndex <= index) {
                continue;
              }

              const comparison = dots[comparisonIndex];
              const distance = Math.hypot(
                dot.x - comparison.x,
                dot.y - comparison.y
              );

              if (distance < LINK_DISTANCE) {
                context.beginPath();
                context.moveTo(dot.x, dot.y);
                context.lineTo(comparison.x, comparison.y);
                context.strokeStyle = `rgba(${palette.link},${
                  (1 - distance / LINK_DISTANCE) * 0.5
                })`;
                context.lineWidth = 1;
                context.stroke();
              }
            }
          }
        }

        const mouseDistance = Math.hypot(
          dot.x - mouse.x,
          dot.y - mouse.y
        );

        if (mouseDistance < MOUSE_DISTANCE) {
          context.beginPath();
          context.moveTo(dot.x, dot.y);
          context.lineTo(mouse.x, mouse.y);
          context.strokeStyle = `rgba(${palette.mouseLink},${
            (1 - mouseDistance / MOUSE_DISTANCE) * 0.85
          })`;
          context.lineWidth = 1;
          context.stroke();
        }
      }

      scheduleFrame();
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = OFFSCREEN;
      mouse.y = OFFSCREEN;
    };

    const handleResize = () => {
      resize();
      if (reducedMotion) {
        draw(0);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        return;
      }

      lastFrameTime = 0;
      scheduleFrame();
    };

    resize();
    if (reducedMotion) {
      draw(0);
    } else {
      scheduleFrame();
    }
    window.addEventListener("resize", handleResize, { passive: true });
    if (tracksPointer) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      if (tracksPointer) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, [density, theme]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
