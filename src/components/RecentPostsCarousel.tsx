import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PostCard from './PostCard';
import { posts } from '../data/posts';
import type { Post } from '../data/posts';

const RecentPostsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const postsPerSlide = 3;
  const totalSlides = Math.ceil(posts.length / postsPerSlide);

  const getVisiblePosts = useCallback((index: number): Post[] => {
    const startIndex = (index * postsPerSlide) % posts.length;
    const visiblePosts: Post[] = [];
    
    for (let i = 0; i < postsPerSlide; i++) {
      const postIndex = (startIndex + i) % posts.length;
      visiblePosts.push(posts[postIndex]);
    }
    
    return visiblePosts;
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-rotation every 3 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevSlide();
        setIsAutoPlaying(false);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextSlide();
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const visiblePosts = getVisiblePosts(currentIndex);

  const handleManualNavigation = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  return (
    <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Recent Posts
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleManualNavigation('prev')}
              className="p-2 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 transition-all duration-200"
              aria-label="Previous posts"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleManualNavigation('next')}
              className="p-2 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 transition-all duration-200"
              aria-label="Next posts"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const slidePosts = getVisiblePosts(slideIndex);
              return (
                <div 
                  key={slideIndex}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {slidePosts.map((post) => (
                      <PostCard key={`${slideIndex}-${post.id}`} {...post} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-400 w-6' 
                  : 'bg-blue-400/30 hover:bg-blue-400/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <a 
            href="/posts" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium text-lg"
          >
            View all posts →
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentPostsCarousel;
