import { useState, useEffect } from 'react';
import { Boxes } from '@/components/ui/background-boxes';
import ParticlesComponent from '@/components/ui/particles-bg';
import RecentPostsCarousel from '../components/RecentPostsCarousel';
import FeaturedProjectsGallery from '../components/FeaturedProjectsGallery';
import TypewriterText from '../components/TypewriterText';
import MouseQuadrantDemo from '@/components/ui/mouse-quadrant-demo';
import ScrollProgressBar from '@/components/ui/scroll-progress-bar';

const HERO_PANEL_HEIGHT = 'clamp(18rem,38vw,28rem)';

const Home = () => {
  const [heroReady, setHeroReady] = useState(false);
  const [subtitleComplete, setSubtitleComplete] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHeroReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <ScrollProgressBar />
      <ParticlesComponent className="-inset-x-[8%] -inset-y-[10%] [transform:scale(1.08)]" particleCount={220} linkDistance={190} linkOpacity={0.52} moveSpeed={1.8} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_58%,rgba(255,255,255,0.06),transparent_46%),linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0.9))]" />

      <div className="relative z-10">
        <section className="pb-10 pt-32 md:pt-40 lg:pb-16 lg:pt-32">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`relative overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-slate-900/70 shadow-[0_25px_80px_rgba(14,165,233,0.16)] backdrop-blur-sm transition-all duration-700 ease-out ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              transitionDelay: '300ms',
              height: HERO_PANEL_HEIGHT,
            }}
          >
            <div className="absolute inset-0">
              <Boxes className="opacity-85" rows={28} cols={20} />
              <div className="pointer-events-none absolute inset-0 bg-slate-900/55 [mask-image:radial-gradient(circle_at_center,transparent_10%,white_72%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(2,6,23,0.34))]" />
            </div>

            <div className="pointer-events-none relative z-20 h-full p-[clamp(1rem,3vw,2rem)]">
              <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="pointer-events-auto order-2 h-full lg:order-1 lg:col-span-5">
                  <MouseQuadrantDemo />
                </div>

                <div className="order-1 flex h-full items-center text-left lg:order-2 lg:col-span-7 lg:text-right">
                  <p className="m-0 max-w-2xl font-courier text-2xl leading-relaxed tracking-wide text-white sm:text-3xl md:text-4xl lg:ml-auto lg:text-5xl">
                    <TypewriterText text="Get to know me and my personal projects." speed={30} onComplete={() => setSubtitleComplete(true)} keepCursorAfterComplete={true} />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-8 flex flex-col items-center gap-2 transition-all duration-700 ease-out lg:mt-12 lg:items-end ${subtitleComplete ? 'opacity-100 translate-y-0 animate-bounce' : 'opacity-0 translate-y-4'}`} style={{
            transitionDelay: '150ms'
          }}>
            <span className="font-courier text-sm tracking-wide text-primary-foreground">Scroll for More</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          </div>
        </section>

        <section className="relative -mt-12 min-h-[60vh] md:-mt-16">
          <div className="relative z-10 py-0">
            <RecentPostsCarousel />
          </div>
        </section>

        <section className="relative">
          <div className="relative z-10">
            <FeaturedProjectsGallery />
          </div>
        </section>
      </div>
    </div>;
};
export default Home;
