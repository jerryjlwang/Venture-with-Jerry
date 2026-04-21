'use client';

import { useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type ParticleDomInstance = {
  pJS: {
    canvas?: { el?: HTMLCanvasElement };
    fn: {
      modes?: {
        pushParticles?: (
          count: number,
          position?: { pos_x: number; pos_y: number },
        ) => void;
      };
      vendors: { destroypJS: () => void };
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
    if (typeof window === 'undefined') return resolve();
    if (window.particlesJS) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(PARTICLES_SCRIPT_SELECTOR);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('particles.js load failed')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    script.defer = true;
    script.dataset.particlesJs = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('particles.js load failed'));
    document.body.appendChild(script);
  });

export default function ParticlesComponent({
  className,
  particleCount = 140,
  linkDistance = 160,
  linkOpacity = 0.4,
  moveSpeed = 2,
}: ParticlesComponentProps) {
  const initParticles = useCallback(() => {
    const container = document.getElementById('particles-js');
    if (!container || !window.particlesJS) return;

    container.querySelector('canvas')?.remove();

    if (window.pJSDom?.length) {
      window.pJSDom.forEach((inst) => inst.pJS.fn.vendors.destroypJS());
      window.pJSDom = [];
    }

    window.particlesJS('particles-js', {
      particles: {
        number: { value: particleCount, density: { enable: true, value_area: 1100 } },
        color: { value: '#00f5ff' },
        shape: { type: 'circle', stroke: { width: 0.5, color: '#0096c7' } },
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
          color: '#00d9ff',
          opacity: linkOpacity,
          width: 1.2,
        },
        move: { enable: true, speed: moveSpeed, random: true, out_mode: 'bounce' },
      },
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: false, mode: 'push' },
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

  const pushParticleAtClick = useCallback((event: MouseEvent) => {
    const canvas = document.querySelector<HTMLCanvasElement>('#particles-js canvas');
    if (!canvas || !window.pJSDom?.length) return;
    const instance =
      window.pJSDom.find((inst) => inst.pJS.canvas?.el === canvas) ??
      window.pJSDom[window.pJSDom.length - 1];
    const push = instance?.pJS.fn.modes?.pushParticles;
    if (!push) return;
    const rect = canvas.getBoundingClientRect();
    push(1, { pos_x: event.clientX - rect.left, pos_y: event.clientY - rect.top });
  }, []);

  const mountedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    mountedRef.current = true;

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
      pushParticleAtClick(event);
    };

    loadParticlesScript()
      .then(() => {
        if (!mountedRef.current) return;
        initParticles();
      })
      .catch(() => {
        // Fail softly if the CDN is blocked.
      });

    window.addEventListener('click', handleWindowClick);

    return () => {
      mountedRef.current = false;
      window.removeEventListener('click', handleWindowClick);

      if (window.pJSDom?.length) {
        window.pJSDom.forEach((inst) => inst.pJS.fn.vendors.destroypJS());
        window.pJSDom = [];
      }
      document.querySelector('#particles-js canvas')?.remove();
    };
  }, [initParticles, pushParticleAtClick]);

  return (
    <div
      id="particles-js"
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black via-[#05070a] to-black',
        className,
      )}
    />
  );
}
