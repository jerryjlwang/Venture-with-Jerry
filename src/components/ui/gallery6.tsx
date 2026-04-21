"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TextRoll } from "@/components/ui/text-roll";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  demoLabel?: string;
  items?: GalleryItem[];
  animateHeading?: boolean;
  headingClassName?: string;
  demoMode?: "text" | "github-icon";
}

const defaultItems: GalleryItem[] = [
  {
    id: "item-1",
    title: "Build Modern UIs",
    summary:
      "Create stunning user interfaces with our comprehensive design system.",
    url: "#",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "item-2",
    title: "Computer Vision Technology",
    summary:
      "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
    url: "#",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "item-3",
    title: "Machine Learning Automation",
    summary:
      "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
    url: "#",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "item-4",
    title: "Predictive Analytics",
    summary:
      "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
    url: "#",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "item-5",
    title: "Neural Network Architecture",
    summary:
      "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
    url: "#",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
];

const isInternalUrl = (url: string) =>
  url.startsWith("/") && !url.startsWith("//");

const Gallery6 = ({
  heading = "Gallery",
  demoUrl = "https://www.shadcnblocks.com",
  demoLabel = "Book a demo",
  items = defaultItems,
  animateHeading = false,
  headingClassName,
  demoMode = "text",
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [headingAnimationReady, setHeadingAnimationReady] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!animateHeading) {
      return;
    }

    const headingElement = headingRef.current;
    if (!headingElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) {
          return;
        }

        setHeadingAnimationReady(true);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(headingElement);

    return () => observer.disconnect();
  }, [animateHeading]);

  const DemoLinkTag = isInternalUrl(demoUrl) ? Link : "a";

  return (
    <section className="py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2
              ref={headingRef}
              className={cn(
                "mb-3 text-3xl font-courier font-semibold tracking-wide text-white md:mb-4 md:text-4xl lg:mb-6",
                headingClassName
              )}
            >
              {animateHeading && headingAnimationReady ? (
                <TextRoll>{heading}</TextRoll>
              ) : (
                heading
              )}
            </h2>
            {demoMode === "github-icon" ? (
              <DemoLinkTag
                {...(isInternalUrl(demoUrl)
                  ? { to: demoUrl }
                  : {
                      href: demoUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                aria-label={demoLabel}
                title={demoLabel}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:rotate-45 hover:border-cyan-300/70 hover:bg-cyan-300/15 hover:text-cyan-200 hover:shadow-[0_0_0_1px_rgba(125,211,252,0.24),0_0_28px_rgba(34,211,238,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Github className="size-5 transition-transform duration-300 group-hover:scale-110" />
              </DemoLinkTag>
            ) : (
              <DemoLinkTag
                {...(isInternalUrl(demoUrl)
                  ? { to: demoUrl }
                  : {
                      href: demoUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                className="group flex items-center gap-1 text-sm font-medium text-blue-300 md:text-base lg:text-lg"
              >
                {demoLabel}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
              </DemoLinkTag>
            )}
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => {
              const ItemLinkTag = isInternalUrl(item.url) ? Link : "a";

              return (
                <CarouselItem key={item.id} className="pl-4 md:max-w-[452px]">
                  <ItemLinkTag
                    {...(isInternalUrl(item.url)
                      ? { to: item.url }
                      : { href: item.url, target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex h-full flex-col justify-between"
                  >
                    <div>
                      <div className="flex aspect-[3/2] overflow-clip rounded-xl border border-white/10 bg-white/5">
                        <div className="flex-1">
                          <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.05),rgba(2,6,23,0.55)_70%,rgba(2,6,23,0.78))]" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "mb-2 line-clamp-3 break-words pt-4 text-lg font-medium text-white md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl"
                      )}
                    >
                      {item.title}
                    </div>
                    <div className="mb-8 line-clamp-2 text-sm text-white/65 md:mb-12 md:text-base lg:mb-9">
                      {item.summary}
                    </div>
                    <div className="flex items-center text-sm text-blue-300">
                      Read more{" "}
                      <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </ItemLinkTag>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery6 };
