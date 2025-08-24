import { Link } from 'react-router-dom';

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl?: string;
}

const PostCard = ({ id, title, excerpt, date, readTime, imageUrl }: PostCardProps) => {
  // Default placeholder if no imageUrl provided
  const defaultImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";
  const displayImage = imageUrl || defaultImage;
  
  return (
    <article className="bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border border-blue-900/30 hover:border-blue-400/60 cursor-pointer group">
      <Link to={`/posts/${id}`} className="block">
        <div className="p-6">
          {/* Avatar and meta info */}
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={displayImage} 
              alt="Interviewee portrait"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-400/30"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm text-blue-300">
                <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
                <span>{readTime}</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 transition-colors font-public-sans">
            {title}
          </h3>
          
          <p className="text-gray-300 mb-4 leading-relaxed font-public-sans">
            {excerpt}
          </p>
          
          <div className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium font-public-sans">
            Read more →
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;