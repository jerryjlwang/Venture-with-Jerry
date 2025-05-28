
import { Link } from 'react-router-dom';

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

const PostCard = ({ id, title, excerpt, date, readTime }: PostCardProps) => {
  return (
    <article className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-900/30">
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-blue-300 mb-3">
          <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
          <span>{readTime}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-300 transition-colors">
          <Link to={`/posts/${id}`}>
            {title}
          </Link>
        </h3>
        
        <p className="text-gray-300 mb-4 leading-relaxed">
          {excerpt}
        </p>
        
        <Link 
          to={`/posts/${id}`}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
