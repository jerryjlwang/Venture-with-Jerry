import { Link } from 'react-router-dom';
import { ASSET_V } from '../lib/assetVersion';

interface PostGraphicCardProps {
  id: string;
  graphic?: string;
  title: string;
}

const PostGraphicCard = ({ id, graphic, title }: PostGraphicCardProps) => {
  const defaultGraphic = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop";
  const displayGraphic = graphic ? `${graphic}?v=${ASSET_V}` : defaultGraphic;
  
  return (
    <article className="group cursor-pointer overflow-hidden rounded-lg border border-blue-900/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
      <Link to={`/posts/${id}`} className="block">
        <img 
          src={displayGraphic}
          alt={title}
          className="w-full h-auto object-cover"
        />
      </Link>
    </article>
  );
};

export default PostGraphicCard;
