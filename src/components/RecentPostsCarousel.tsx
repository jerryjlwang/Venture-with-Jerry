import { useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import PostCard from './PostCard';
import { posts } from '../data/posts';
const RecentPostsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1
  });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-rotation every 5 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollNext, scrollPrev]);
  return <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-courier font-medium text-white tracking-wide">
            Recent Posts
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={scrollPrev} className="p-2 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 transition-all duration-200" aria-label="Previous posts">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="p-2 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 transition-all duration-200" aria-label="Next posts">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {posts.map(post => <div key={post.id} className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]">
                <PostCard {...post} />
              </div>)}
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/posts" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-courier font-medium text-lg tracking-wide">
            View all posts →
          </a>
        </div>
      </div>
    </section>;
};
export default RecentPostsCarousel;