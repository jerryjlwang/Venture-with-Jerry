type Fund = {
  name: string;
  url: string;
  logo?: string;
};

const funds: Fund[] = [
  {
    name: "OneSixOne Ventures",
    url: "https://www.onesixone.ventures",
  },
  {
    name: "WestRiver Group",
    url: "https://www.wrg.vc",
  },
  {
    name: "Tola Capital",
    url: "https://tolacapital.com",
  },
  {
    name: "Ascend VC",
    url: "https://www.ascend.vc",
    logo: "/lovable-uploads/ascend-logo.png",
  },
  {
    name: "Madrona",
    url: "https://www.madrona.com",
  },
  {
    name: "Founders' Co-op",
    url: "https://www.founderscoop.com",
  },
  {
    name: "Voyager Capital",
    url: "https://www.voyagercapital.com/",
  },
  {
    name: "Pioneer Square Labs",
    url: "https://www.psl.com/",
  },
  {
    name: "Bling Capital",
    url: "https://www.blingcap.com/",
  },
  {
    name: "Slipstream",
    url: "https://www.slipstream.vc/",
    logo: "/lovable-uploads/sslogo.webp",
  },
];

export default function LogoCarousel() {
  return (
    <div className="w-full">
      <p className="mb-6 text-center font-courier text-sm uppercase tracking-widest text-white/50">
        Funds Interviewed
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {funds.map((fund) => (
          <a
            key={fund.name}
            href={fund.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex aspect-[2/1] items-center justify-center overflow-hidden rounded-lg border border-slate-200/80 bg-white/95 p-4 text-center font-courier font-bold leading-tight text-slate-800 transition-transform duration-300 hover:scale-[1.03]"
          >
            {fund.logo ? (
              <img
                src={fund.logo}
                alt={fund.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span>{fund.name}</span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
