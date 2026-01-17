import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ASSET_V } from '../lib/assetVersion';

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  graphic?: string;
}

const PostCard = ({ id, title, excerpt, date, readTime, imageUrl, graphic }: PostCardProps) => {
  // Default placeholder if no imageUrl provided
  const defaultImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";
  const displayImage = imageUrl || defaultImage;
  
  const preloadGraphic = useCallback(() => {
    if (!graphic) return;
    try {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = `${graphic}?v=${ASSET_V}`;
      document.head.appendChild(link);
    } catch {}
    const img = new Image();
    img.src = `${graphic}?v=${ASSET_V}`;
  }, [graphic]);
  
  return (
    <article 
      className="group relative bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer h-full"
      onMouseEnter={preloadGraphic} 
      onPointerEnter={preloadGraphic} 
      onFocus={preloadGraphic}
    >
      <Link to={`/posts/${id}`} className="block h-full">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url(${displayImage})` }}
        />
        
        {/* Dark overlay on top of image */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col justify-end h-full min-h-[320px]">
          {/* Date badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-courier tracking-wide rounded-full">
              {readTime}
            </span>
          </div>
          
          {/* Bottom content */}
          <div className="mt-auto">
            <time 
              dateTime={date} 
              className="text-blue-300/80 text-sm font-courier tracking-wide mb-2 block"
            >
              {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </time>
            
            <h3 className="text-xl font-courier font-medium text-white mb-3 tracking-wide group-hover:text-blue-100 transition-colors duration-300">
              {title}
            </h3>
            
            <p className="text-gray-300/90 text-sm leading-relaxed font-courier tracking-wide line-clamp-2 mb-4">
              {excerpt}
            </p>
            
            <div className="inline-flex items-center text-blue-400 group-hover:text-blue-300 transition-colors font-courier tracking-wide text-sm">
              Read more 
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;