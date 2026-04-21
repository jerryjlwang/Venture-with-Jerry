import { useEffect, useRef, useState } from 'react';

interface Logo {
  id: string;
  name: string;
  src: string;
  url: string;
}

const logos: Logo[] = [
  {
    id: '1',
    name: 'Onesixone Ventures',
    src: 'https://images.squarespace-cdn.com/content/v1/62c76bc98f086645bc40162f/33627f65-3967-4877-b6bd-b8c5706e5389/Untitled+design.png',
    url: 'https://www.onesixone.ventures',
  },
  {
    id: '2',
    name: 'West River Group',
    src: 'https://images.squarespace-cdn.com/content/v1/6337b0e52a797969996c3b4c/a6d9c2c8-4211-4db9-baf5-d668f9b066da/WRG+Transparent.png',
    url: 'https://www.wrg.vc',
  },
  {
    id: '3',
    name: 'Tola Capital',
    src: 'https://tolacapital.com/wp-content/uploads/2022/11/TC-portrait-logo-1600x800-1.png',
    url: 'https://tolacapital.com',
  },
  {
    id: '4',
    name: 'Ascend VC',
    src: '/lovable-uploads/ascend-logo.png',
    url: 'https://www.ascend.vc',
  },
  {
    id: '5',
    name: 'Madrona',
    src: 'https://www.madrona.com/wp-content/uploads/2022/10/Madrona_LockupV_MADGRN_RGB_1000W-300x200.png',
    url: 'https://www.madrona.com',
  },
  {
    id: '6',
    name: "Founders' Co-op",
    src: 'https://www.washingtontechnology.org/wp-content/uploads/2018/08/founders-coop.png',
    url: 'https://www.founderscoop.com',
  },
  {
    id: '7',
    name: 'Voyager Capital',
    src: 'https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/modified/0901d791-bed4-4b60-b29d-e7fa33ea8b9c.png',
    url: 'https://www.voyagercapital.com/',
  },
  {
    id: '8',
    name: 'Pioneer Square Labs',
    src: 'https://hcseattle.clubs.harvard.edu/images/vault/886.png',
    url: 'https://www.psl.com/',
  },
  {
    id: '9',
    name: 'Bling Capital',
    src: 'https://www.blingcap.com/static/images/logo-social.png',
    url: 'https://www.blingcap.com/',
  },
  {
    id: '10',
    name: 'Slipstream',
    src: '/lovable-uploads/sslogo.webp',
    url: 'https://www.slipstream.vc/',
  },
];

const getBackgroundColor = (name: string) => {
  if (name === 'Ascend VC') return '#00aeef';
  if (name === 'Onesixone Ventures') return '#000000';
  if (name === 'Bling Capital' || name === 'Pioneer Square Labs') return '#ffffff';
  return undefined;
};

const getScaleClass = (name: string) => {
  if (name === 'Ascend VC') return 'scale-125';
  if (name === 'Onesixone Ventures') return 'scale-[1.15]';
  if (name === "Founders' Co-op") return 'scale-[1.4]';
  if (name === 'Bling Capital') return 'scale-110';
  return '';
};

const LogoCarousel = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <p className="text-sm font-courier text-white/50 mb-6 text-center tracking-widest uppercase">
        FUNDS INTERVIEWED
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {logos.map((logo, index) => {
          const needsBackground =
            logo.name !== 'Ascend VC' &&
            logo.name !== 'Onesixone Ventures' &&
            logo.name !== 'Bling Capital' &&
            logo.name !== 'Pioneer Square Labs';

          return (
            <a
              key={logo.id}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`aspect-[2/1] rounded-lg hover:scale-105 transition-all duration-500 p-4 flex items-center justify-center overflow-hidden ${needsBackground ? 'bg-white/90' : ''} ${isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
              style={{
                backgroundColor: getBackgroundColor(logo.name),
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: isRevealed ? `${index * 120}ms` : '0ms',
              }}
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className={`object-contain max-w-full max-h-full ${getScaleClass(logo.name)}`}
                loading="lazy"
                decoding="async"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default LogoCarousel;
