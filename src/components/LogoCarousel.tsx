import React, { useState, useEffect, useRef } from 'react';
interface Logo {
  id: string;
  name: string;
  src: string;
  url: string;
}
const LogoCarousel = () => {
  const [visibleLogos, setVisibleLogos] = useState<Set<number>>(new Set());
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Company logos with actual image sources
  const logos: Logo[] = [{
    id: '1',
    name: 'Onesixone Ventures',
    src: 'https://images.squarespace-cdn.com/content/v1/62c76bc98f086645bc40162f/33627f65-3967-4877-b6bd-b8c5706e5389/Untitled+design.png',
    url: 'https://www.onesixone.ventures'
  }, {
    id: '2',
    name: 'West River Group',
    src: 'https://images.squarespace-cdn.com/content/v1/6337b0e52a797969996c3b4c/a6d9c2c8-4211-4db9-baf5-d668f9b066da/WRG+Transparent.png',
    url: 'https://www.wrg.vc'
  }, {
    id: '3',
    name: 'Tola Capital',
    src: 'https://tolacapital.com/wp-content/uploads/2022/11/TC-portrait-logo-1600x800-1.png',
    url: 'https://tolacapital.com'
  }, {
    id: '4',
    name: 'Ascend VC',
    src: '/lovable-uploads/ascend-logo.png',
    url: 'https://www.ascend.vc'
  }, {
    id: '5',
    name: 'Madrona',
    src: 'https://www.madrona.com/wp-content/uploads/2022/10/Madrona_LockupV_MADGRN_RGB_1000W-300x200.png',
    url: 'https://www.madrona.com'
  }, {
    id: '6',
    name: 'Founders\' Co-op',
    src: 'https://www.washingtontechnology.org/wp-content/uploads/2018/08/founders-coop.png',
    url: 'https://www.founderscoop.com'
  }, {
    id: '7',
    name: 'Voyager Capital',
    src: 'https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/modified/0901d791-bed4-4b60-b29d-e7fa33ea8b9c.png',
    url: 'https://www.voyagercapital.com/'
  }, {
    id: '8',
    name: 'Pioneer Square Labs',
    src: 'https://hcseattle.clubs.harvard.edu/images/vault/886.png',
    url: 'https://www.psl.com/'
  }, {
    id: '9',
    name: 'Bling Capital',
    src: 'https://www.blingcap.com/static/images/logo-social.png',
    url: 'https://www.blingcap.com/'
  }, {
    id: '10',
    name: 'Slipstream',
    src: '/lovable-uploads/sslogo.webp',
    url: 'https://www.slipstream.vc/'
  }];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasTriggered) {
        setHasTriggered(true);
        // Stagger reveal each logo
        logos.forEach((_, index) => {
          setTimeout(() => {
            setVisibleLogos(prev => new Set([...prev, index]));
          }, index * 120); // 120ms stagger between each logo
        });
      }
    }, {
      threshold: 0.2
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [hasTriggered, logos.length]);
  const LogoItem = ({
    logo,
    index
  }: {
    logo: Logo;
    index: number;
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const isVisible = visibleLogos.has(index);

    // Scale up specific logos that appear too small
    const isFoundersCoop = logo.name === "Founders' Co-op";
    const isBlingCapital = logo.name === "Bling Capital";
    const isAscend = logo.name === "Ascend VC";
    const isOnesixone = logo.name === "Onesixone Ventures";
    const isPSL = logo.name === "Pioneer Square Labs";

    // Determine background color
    const getBackgroundColor = () => {
      if (isAscend) return '#00aeef';
      if (isOnesixone) return '#000000';
      if (isBlingCapital || isPSL) return '#ffffff';
      return undefined;
    };
    return <a href={logo.url} target="_blank" rel="noopener noreferrer" className={`aspect-[2/1] rounded-lg hover:scale-105 transition-all duration-500 p-4 flex items-center justify-center overflow-hidden ${isAscend || isOnesixone || isBlingCapital || isPSL ? '' : 'bg-white/90'} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`} style={{
      backgroundColor: getBackgroundColor(),
      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>
        {!imageError ? <>
            <img src={logo.src} alt={`${logo.name} logo`} className={`object-contain max-w-full max-h-full transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${isAscend ? 'scale-125' : isOnesixone ? 'scale-[1.15]' : isFoundersCoop ? 'scale-[1.4]' : isBlingCapital ? 'scale-110' : ''}`} onLoad={() => setImageLoaded(true)} onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }} loading="lazy" />
            {!imageLoaded && <div className="w-full h-full bg-gray-100 animate-pulse rounded" />}
          </> : <div className="w-full h-full rounded flex items-center justify-center text-gray-700 text-xs font-courier tracking-wide text-center p-1">
            {logo.name}
          </div>}
      </a>;
  };
  return <div ref={containerRef} className="w-full">
      <p className="text-sm font-courier text-white/50 mb-6 text-center tracking-widest uppercase">FUNDS INTERVIEWED</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {logos.map((logo, index) => <LogoItem key={logo.id} logo={logo} index={index} />)}
      </div>
    </div>;
};
export default LogoCarousel;