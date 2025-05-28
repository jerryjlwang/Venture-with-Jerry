
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { ArrowUp } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link to="/posts" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-black">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link 
          to="/posts" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 font-medium"
        >
          ← Back to Posts
        </Link>

        <header className="mb-12">
          <div className="flex items-center justify-between text-sm text-blue-300 mb-4">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-lg prose-invert max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <Link 
              to="/posts" 
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              ← Back to Posts
            </Link>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              <ArrowUp size={16} className="mr-1" />
              Back to Top
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default PostDetail;
