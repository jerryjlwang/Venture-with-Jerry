"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ParticleDomInstance = {
  pJS: {
    canvas?: {
      el?: HTMLCanvasElement;
    };
    fn: {
      modes?: {
        pushParticles?: (
          count: number,
          position?: { pos_x: number; pos_y: number },
        ) => void;
      };
      vendors: {
        destroypJS: () => void;
      };
    };
  };
};

declare global {
  interface Window {
    particlesJS?: (tagId: string, config: unknown) => void;
    pJSDom?: ParticleDomInstance[];
  }
}

const PARTICLES_SCRIPT_SELECTOR = 'script[data-particles-js="true"]';

interface ParticlesComponentProps {
  className?: string;
  particleCount?: number;
  linkDistance?: number;
  linkOpacity?: number;
  moveSpeed?: number;
}

const loadParticlesScript = () =>
  new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    if (window.particlesJS) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      PARTICLES_SCRIPT_SELECTOR,
    );

    if (existingScript) {
      const handleLoad = () => resolve();
      const handleError = () => reject(new Error("Failed to load particles.js"));

      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.dataset.particlesJs = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load particles.js"));
    document.body.appendChild(script);
  });

export default function ParticlesComponent({
  className,
  particleCount = 140,
  linkDistance = 160,
  linkOpacity = 0.4,
  moveSpeed = 2,
}: ParticlesComponentProps) {
  const queuedMouseEventRef = useRef<MouseEvent | null>(null);
  const mouseFrameRef = useRef<number | null>(null);

  const dispatchMouseEventToCanvas = useCallback(
    (type: "mousemove" | "click" | "mouseleave", sourceEvent?: MouseEvent) => {
      const canvas = document.querySelector<HTMLCanvasElement>(
        "#particles-js canvas",
      );
      if (!canvas) return;

      canvas.dispatchEvent(
        new MouseEvent(type, {
          bubbles: type !== "mouseleave",
          cancelable: true,
          clientX: sourceEvent?.clientX ?? 0,
          clientY: sourceEvent?.clientY ?? 0,
          view: window,
        }),
      );
    },
    [],
  );

  const pushParticleAtClick = useCallback((sourceEvent: MouseEvent) => {
    const canvas = document.querySelector<HTMLCanvasElement>(
      "#particles-js canvas",
    );
    if (!canvas || !window.pJSDom?.length) return;

    const particleInstance =
      window.pJSDom.find((instance) => instance.pJS.canvas?.el === canvas) ??
      window.pJSDom[window.pJSDom.length - 1];

    const pushParticles = particleInstance?.pJS.fn.modes?.pushParticles;
    if (!pushParticles) return;

    const rect = canvas.getBoundingClientRect();

    pushParticles(1, {
      pos_x: sourceEvent.clientX - rect.left,
      pos_y: sourceEvent.clientY - rect.top,
    });
  }, []);

  const initParticles = useCallback((isDark: boolean) => {
    const container = document.getElementById("particles-js");
    if (!container || !window.particlesJS) return;

    const oldCanvas = container.querySelector("canvas");
    if (oldCanvas) oldCanvas.remove();

    if (window.pJSDom?.length) {
      window.pJSDom.forEach((particleInstance) =>
        particleInstance.pJS.fn.vendors.destroypJS(),
      );
      window.pJSDom = [];
    }

    const colors = isDark
      ? {
          particles: "#00f5ff",
          lines: "#00d9ff",
          accent: "#0096c7",
        }
      : {
          particles: "#0277bd",
          lines: "#0288d1",
          accent: "#039be5",
        };

    window.particlesJS("particles-js", {
      particles: {
        number: {
          value: particleCount,
          density: { enable: true, value_area: 1100 },
        },
        color: { value: colors.particles },
        shape: { type: "circle", stroke: { width: 0.5, color: colors.accent } },
        opacity: {
          value: 0.7,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.3 },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 1 },
        },
        line_linked: {
          enable: true,
          distance: linkDistance,
          color: colors.lines,
          opacity: linkOpacity,
          width: 1.2,
        },
        move: {
          enable: true,
          speed: moveSpeed,
          random: true,
          out_mode: "bounce",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: false, mode: "push" },
          resize: true,
        },
        modes: {
          grab: {
            distance: Math.max(linkDistance + 40, 220),
            line_linked: { opacity: Math.min(linkOpacity + 0.35, 0.95) },
          },
          push: { particles_nb: 1 },
          repulse: { distance: 180, duration: 0.4 },
        },
      },
      retina_detect: true,
    });
  }, [linkDistance, linkOpacity, moveSpeed, particleCount]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer: MutationObserver | null = null;
    let isMounted = true;

    const handleWindowMouseMove = (event: MouseEvent) => {
      queuedMouseEventRef.current = event;

      if (mouseFrameRef.current !== null) return;

      mouseFrameRef.current = requestAnimationFrame(() => {
        if (queuedMouseEventRef.current) {
          dispatchMouseEventToCanvas("mousemove", queuedMouseEventRef.current);
        }

        queuedMouseEventRef.current = null;
        mouseFrameRef.current = null;
      });
    };

    const handleWindowClick = (event: MouseEvent) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest(
          "a, button, input, textarea, select, summary, [role='button']",
        )
      ) {
        return;
      }

      dispatchMouseEventToCanvas("mousemove", event);
      pushParticleAtClick(event);
    };

    const handleWindowMouseLeave = () => {
      dispatchMouseEventToCanvas("mouseleave");
    };

    const detectDark = () => {
      const html = document.documentElement;
      return (
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark"
      );
    };

    loadParticlesScript()
      .then(() => {
        if (!isMounted) return;

        initParticles(detectDark());

        observer = new MutationObserver(() => initParticles(detectDark()));
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class", "data-theme"],
        });
      })
      .catch(() => {
        // Fail softly so the landing page still renders even if the CDN is blocked.
      });

    window.addEventListener("mousemove", handleWindowMouseMove, {
      passive: true,
    });
    window.addEventListener("click", handleWindowClick);
    document.documentElement.addEventListener(
      "mouseleave",
      handleWindowMouseLeave,
    );

    return () => {
      isMounted = false;
      observer?.disconnect();
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("click", handleWindowClick);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleWindowMouseLeave,
      );
      if (mouseFrameRef.current !== null) {
        cancelAnimationFrame(mouseFrameRef.current);
      }
      mouseFrameRef.current = null;
      queuedMouseEventRef.current = null;

      if (window.pJSDom?.length) {
        window.pJSDom.forEach((particleInstance) =>
          particleInstance.pJS.fn.vendors.destroypJS(),
        );
        window.pJSDom = [];
      }

      const oldCanvas = document.querySelector("#particles-js canvas");
      if (oldCanvas) oldCanvas.remove();
    };
  }, [dispatchMouseEventToCanvas, initParticles, pushParticleAtClick]);

  return (
    <div
      id="particles-js"
      aria-hidden="true"
      className={cn(
        `
          pointer-events-none absolute inset-0 z-0
          transition-colors duration-500
          bg-gradient-to-b from-black via-[#05070a] to-black
          dark:from-black dark:via-[#05070a] dark:to-black
        `,
        className,
      )}
    />
  );
}
