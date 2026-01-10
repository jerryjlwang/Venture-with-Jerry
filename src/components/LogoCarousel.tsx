import React, { useState } from 'react';

interface Logo {
  id: string;
  name: string;
  src: string;
  url: string;
}

interface LogoCarouselProps {
  direction?: 'vertical' | 'horizontal';
}

const LogoCarousel = ({ direction = 'vertical' }: LogoCarouselProps) => {
  // Company logos with actual image sources
  const logos: Logo[] = [
    { 
      id: '1', 
      name: 'Onesixone Ventures', 
      src: 'https://images.squarespace-cdn.com/content/v1/62c76bc98f086645bc40162f/33627f65-3967-4877-b6bd-b8c5706e5389/Untitled+design.png',
      url: 'https://www.onesixone.ventures'
    },
    { 
      id: '2', 
      name: 'West River Group', 
      src: 'https://images.squarespace-cdn.com/content/v1/6337b0e52a797969996c3b4c/a6d9c2c8-4211-4db9-baf5-d668f9b066da/WRG+Transparent.png',
      url: 'https://www.wrg.vc'
    },
    { 
      id: '3', 
      name: 'Tola Capital', 
      src: 'https://tolacapital.com/wp-content/uploads/2022/11/TC-portrait-logo-1600x800-1.png',
      url: 'https://tolacapital.com'
    },
    { 
      id: '4', 
      name: 'Ascend VC', 
      src: 'https://images.squarespace-cdn.com/content/v1/5d6ed158d1024700012397dc/1574804203738-JYY4WYCNRJVQM2YK8SLO/ascend_logo_color_novc.png?format=1000w',
      url: 'https://www.ascend.vc'
    },
    { 
      id: '5', 
      name: 'Madrona', 
      src: 'https://www.madrona.com/wp-content/uploads/2022/10/Madrona_LockupV_MADGRN_RGB_1000W-300x200.png',
      url: 'https://www.madrona.com'
    },
    { 
      id: '6', 
      name: 'Founders\' Co-op', 
      src: 'https://www.washingtontechnology.org/wp-content/uploads/2018/08/founders-coop.png',
      url: 'https://www.founderscoop.com'
    },
    { 
      id: '7', 
      name: 'Voyager Capital', 
      src: 'https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/modified/0901d791-bed4-4b60-b29d-e7fa33ea8b9c.png',
      url: 'https://www.voyagercapital.com/'
    },
    { 
      id: '8', 
      name: 'Pioneer Square Labs', 
      src: 'https://hcseattle.clubs.harvard.edu/images/vault/886.png',
      url: 'https://www.psl.com/'
    },
    { 
      id: '9', 
      name: 'Bling Capital', 
      src: 'https://www.blingcap.com/static/images/logo-social.png',
      url: 'https://www.blingcap.com/'
    },
    { 
      id: '10', 
      name: 'Slipstream', 
      src: '/lovable-uploads/sslogo.webp',
      url: 'https://www.slipstream.vc/'
    },
  ];

  // Double the logos for seamless infinite scroll
  const doubleLogos = [...logos, ...logos];

  const LogoItem = ({ logo, index }: { logo: Logo; index: number }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    // Scale up specific logos that appear too small
    const needsLargerSize = logo.name === "Founders' Co-op" || logo.name === "Bling Capital";

    return (
      <a 
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${direction === 'horizontal' ? 'w-36 h-16' : 'h-16'} bg-white rounded-lg border border-white/30 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 p-3 flex items-center justify-center flex-shrink-0`}
      >
        {!imageError ? (
          <>
            <img 
              src={logo.src}
              alt={`${logo.name} logo`}
              className={`object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${needsLargerSize ? 'max-w-[140%] max-h-[140%] scale-125' : 'max-w-full max-h-full'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
              loading="lazy"
            />
            {!imageLoaded && (
              <div className="w-full h-full bg-gray-100 animate-pulse rounded" />
            )}
          </>
        ) : (
          <div className="w-full h-full rounded flex items-center justify-center text-gray-700 text-xs font-playfair tracking-wide text-center p-1">
            {logo.name}
          </div>
        )}
      </a>
    );
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h2 className="text-lg font-playfair font-normal text-white/80 mb-4 text-center tracking-widest">Companies Interviewed</h2>
      <div 
        className={`overflow-hidden ${
          direction === 'horizontal' ? 'w-full h-24' : 'h-80'
        }`}
      >
        <div 
          className={`flex gap-4 ${direction === 'horizontal' ? 'flex-row animate-scroll-horizontal' : 'flex-col animate-scroll-vertical'}`}
          style={{ 
            willChange: 'transform',
          }}
        >
          {doubleLogos.map((logo, index) => (
            <LogoItem key={`${logo.id}-${index}`} logo={logo} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
