import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ASSET_V } from '../lib/assetVersion';
import { Skeleton } from './ui/skeleton';

interface PostGraphicCardProps {
  id: string;
  graphic?: string;
  title: string;
}

const PostGraphicCard = ({ id, graphic, title }: PostGraphicCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const defaultGraphic = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop";
  const displayGraphic = graphic ? `${graphic}?v=${ASSET_V}` : defaultGraphic;
  
  return (
    <article className="group cursor-pointer overflow-hidden rounded-lg border border-blue-900/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
      <Link to={`/posts/${id}`} className="block relative aspect-square">
        {!isLoaded && !hasError && (
          <Skeleton className="absolute inset-0 w-full h-full bg-slate-700/50" />
        )}
        <img 
          src={displayGraphic}
          alt={title}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </Link>
    </article>
  );
};

export default PostGraphicCard;
