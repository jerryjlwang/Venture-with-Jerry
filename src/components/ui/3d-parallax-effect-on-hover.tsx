import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface ParallaxImageItem {
  src: string;
  alt: string;
  f?: number;
  r?: string;
  href?: string;
  title?: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
}

const images: ParallaxImageItem[] = [
  {
    src: "https://picsum.photos/id/65/300/300",
    alt: "the back of a random person",
    f: 0.1,
    r: "10px",
  },
  {
    src: "https://assets.codepen.io/1480814/pexels-pixabay-62655.jpg",
    alt: "an eagle",
    f: 0.12,
    r: "5px",
  },
  {
    src: "https://picsum.photos/id/755/300/300",
    alt: "a cup of tea",
    f: 0.08,
    r: "20px",
  },
];

interface ParallaxImagesProps {
  items?: ParallaxImageItem[];
  className?: string;
}

export default function ParallaxImages({
  items = images,
  className,
}: ParallaxImagesProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {items.map((img, idx) => {
        const media = (
          <article className="parallax-card-shell group h-full">
            <div
              className="parallax-card-media relative aspect-[10/12] overflow-hidden border border-white/15 bg-white/5 shadow-[0_24px_80px_rgba(2,6,23,0.32)]"
              style={{ "--r": img.r || "18px" } as React.CSSProperties}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="parallax-img h-full w-full object-cover"
                style={
                  {
                    "--f": img.f ?? 0.1,
                    "--r": img.r || "18px",
                  } as React.CSSProperties
                }
                loading="lazy"
              />
              <div className="parallax-card-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.05),rgba(2,6,23,0.78)_72%,rgba(2,6,23,0.96))]" />

              {img.readTime ? (
                <div className="parallax-card-badge absolute right-4 top-4">
                  <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-courier tracking-wide text-white backdrop-blur-sm">
                    {img.readTime}
                  </span>
                </div>
              ) : null}

              {(img.title || img.excerpt || img.date) ? (
                <div className="parallax-card-copy absolute inset-x-0 bottom-0 p-6">
                  {img.date ? (
                    <time
                      dateTime={img.date}
                      className="mb-2 block text-sm font-courier tracking-wide text-white/70"
                    >
                      {new Date(img.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  ) : null}
                  {img.title ? (
                    <h3 className="mb-3 text-2xl font-courier font-medium tracking-wide text-white transition-colors duration-300 group-hover:text-blue-100">
                      {img.title}
                    </h3>
                  ) : null}
                  {img.excerpt ? (
                    <p className="line-clamp-3 text-sm leading-relaxed tracking-wide text-gray-300/90">
                      {img.excerpt}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </article>
        );

        return img.href ? (
          <Link key={idx} to={img.href} className="block h-full">
            {media}
          </Link>
        ) : (
          <div key={idx} className="h-full">
            {media}
          </div>
        );
      })}
    </div>
  );
}
